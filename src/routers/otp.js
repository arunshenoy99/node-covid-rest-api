const express = require('express')
const validator = require('validator')

const sendOTP = require('../email/email')
const generateOTP = require('../utils/otp')

const otpRouter = express.Router()

otpRouter.get('/otp', (req, res) => {
    const email = req.query.Email
    if (!email) {
        return res.redirect(`/${req.session.service}`)
    }
    if (!validator.isEmail(email)) {
        return res.redirect(`/${req.session.service}`)
    }
    try {
        const otp = generateOTP()
        req.session.otp = otp
        req.session.valid = false
        sendOTP(email, otp)
        req.session.email = email
    } catch (e) {
        return res.redirect(`${req.session.service}`)
    }
    res.render('otp')
})

otpRouter.post('/otp', (req, res) => {
    if (req.query.resend) {
        sendOTP(req.session.email, req.session.otp)
        return res.render('otp')
    }
    const otp = req.body.otp
    if (otp != req.session.otp) {
        return res.status(400).json({ error: 'Invalid OTP' })
    }
    req.session.valid = true
    res.status(200).json({ path: `${req.session.service}/form` })
})

module.exports = otpRouter