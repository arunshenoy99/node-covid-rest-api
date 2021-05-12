const express = require('express')
const validator = require('validator')

const sendOTP = require('../email/email')
const generateOTP = require('../utils/otp')
const { successLogger, errorLogger } = require('../utils/logger')

const { otpLimiter, otpResendLimiter } = require('../middleware/otpRateLimit')

const otpRouter = express.Router()

otpRouter.get('/otp', otpLimiter, (req, res) => {
    if (!req.session.service || req.session.valid) {
        return res.status(401).send({ error: "The requested service was not found." })
    }
    
    let email = req.query.Email
    let policy = req.query.policy

    if (!email) {
        return res.render('email', {
            emailError: 'Invalid Email address'
        })
    }

    if (!policy) {
        return res.render('email', {
            emailError: 'Please agree to our privacy policy.',
            email
        })
    }

    email = email.trim()

    if (!validator.isEmail(email)) {
        return res.render('email', {
            emailError: 'Invalid email address'
        })
    }

    try {
        const otp = generateOTP()
        req.session.otp = otp
        req.session.valid = false
        sendOTP(email, otp)
        req.session.email = email
        successLogger.info(`GET /otp success. Email:${email}`)
        res.render('otp', {
            email,
            displayService: req.session.displayService,
            service: req.session.service
        })
        successLogger.info(`GET /otp page load success. Email:${email}`)
    } catch(e) {
        res.redirect(`${req.session.service}`)
        errorLogger.error(`GET /otp failed. Email:${email}, Error:${e.message}`)
    }
})

otpRouter.post('/otp', otpLimiter, (req, res) => {

    let otp = req.body.otp

    if (!otp) {
        return res.status(400).json({ error: 'Please provide an OTP.' })
    }

    otp = otp.trim()

    if (otp != req.session.otp) {
        res.status(400).json({ error: 'Invalid OTP. Please try again in some time.' })
        return errorLogger.error(`POST /otp failed. Email:${req.session.email}, Original OTP:${req.session.otp}, Entered OTP:${otp}`)
    }

    req.session.valid = true
    
    res.status(200).json({ path: `${req.session.service}/form` })
    successLogger.info(`POST /otp success. Email:${req.session.email}`)
})

otpRouter.post('/otp/resend', otpResendLimiter, (req, res) => {
    if (!req.session.email || !req.session.otp) {
        res.status(400).json({ error: 'Could not resend OTP.' })
        return errorLogger.error(`POST /otp/resend failed. Email:${req.session.email}, OTP:${req.session.otp}`)
    }
    
    try {
        sendOTP(req.session.email, req.session.otp)
        res.status(200).send()
        successLogger.info(`POST /otp/resend success. Email:${req.session.email}`)
    } catch (e) {
        res.status(400).json({ error: 'Could not resend OTP.' })
        errorLogger.error(`POST /otp/resend failed. Email:${req.session.email}, OTP:${req.session.otp}`)
    }
})

module.exports = otpRouter