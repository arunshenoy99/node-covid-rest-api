const express = require('express')
const validator = require('validator')

const sendOTP = require('../email/email')
const generateOTP = require('../utils/otp')

const { otpLimiter, otpResendLimiter } = require('../middleware/otpRateLimit')

const otpRouter = express.Router()

otpRouter.get('/otp', (req, res) => {
    if (!req.session.service) {
        return res.status(401).send({ error: "The requested service was not found." })
    }
    
    let email = req.query.Email

    if (!email) {
        return res.redirect(`/${req.session.service}`)
    }

    email = email.trim()

    if (!validator.isEmail(email)) {
        return res.redirect(`/${req.session.service}`)
    }

    if (req.session.otp && email == req.session.email) {
        return res.render('otp', {
            email,
            displayService: req.session.displayService,
            service: req.session.service
        })
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

    res.render('otp', {
        email,
        displayService: req.session.displayService,
        service: req.session.service
    })
})

otpRouter.post('/otp', otpLimiter, (req, res) => {

    let otp = req.body.otp

    if (!otp) {
        return res.status(400).json({ error: 'Please provide an OTP.' })
    }

    otp = otp.trim()

    if (otp != req.session.otp) {
        return res.status(400).json({ error: 'Invalid OTP. Please try again in some time.' })
    }

    req.session.valid = true
    
    res.status(200).json({ path: `${req.session.service}/form` })
})

otpRouter.post('/otp/resend', otpResendLimiter, (req, res) => {
    if (req.session.email && req.session.otp) {
        sendOTP(req.session.email, req.session.otp)
        return res.status(200).send()
    }
    
    res.status(400).json({ error: 'Could not resend OTP.' })
})

module.exports = otpRouter