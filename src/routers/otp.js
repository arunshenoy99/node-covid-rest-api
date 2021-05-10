const express = require('express')
const validator = require('validator')

const sendOTP = require('../email/email')
const generateOTP = require('../utils/otp')
const { successLogger, errorLogger } = require('../utils/logger')

const { otpLimiter, otpResendLimiter } = require('../middleware/otpRateLimit')

const otpRouter = express.Router()

otpRouter.get('/otp', otpLimiter, (req, res) => {
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

    try {
        const otp = generateOTP()
        req.session.otp = otp
        req.session.valid = false
        sendOTP(email, otp)
        successLogger.info(`OTP sent to ${email}.`)
        req.session.email = email
    } catch (e) {
        res.redirect(`${req.session.service}`)
        errorLogger.error(`OTP error for ${email}: ${e}`)
    }

    res.render('otp', {
        email,
        displayService: req.session.displayService,
        service: req.session.service
    })
    successLogger.info(`OTP page rendered for ${email}`)
})

otpRouter.post('/otp', otpLimiter, (req, res) => {

    let otp = req.body.otp

    if (!otp) {
        return res.status(400).json({ error: 'Please provide an OTP.' })
    }

    otp = otp.trim()

    if (otp != req.session.otp) {
        res.status(400).json({ error: 'Invalid OTP. Please try again in some time.' })
        return errorLogger.warn(`Invalid OTP entry for ${req.session.email}: Original OTP=${req.session.otp} Entered OTP: ${otp}`)
    }

    req.session.valid = true
    
    res.status(200).json({ path: `${req.session.service}/form` })
    successLogger.info(`Validated OTP for ${req.session.email}`)
})

otpRouter.post('/otp/resend', otpResendLimiter, (req, res) => {
    if (req.session.email && req.session.otp) {
        sendOTP(req.session.email, req.session.otp)
        res.status(200).send()
        return successLogger.info(`Resent OTP for ${req.session.email}`)
    }
    
    res.status(400).json({ error: 'Could not resend OTP.' })
    errorLogger.error(`Error resending OTP for ${req.session.email}`)
})

module.exports = otpRouter