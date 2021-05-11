const rateLimit = require('express-rate-limit')

const { errorLogger } = require('../utils/logger')

const otpLimiter = rateLimit({
    windowMs: 60000,
    max: 3,
    headers: true,
    handler(req, res) {
        res.status(429).json({ error: 'You have exceeded the number of allowed requests. Please try again after 60 seconds.'})
        errorLogger.error(`${req.method} ${req.path} throttled. Email:${req.session.email}`)
    }
})

const otpResendLimiter = rateLimit({
    windowMs: 25000,
    max: 1,
    headers: true,
    handler(req, res) {
        res.status(429).json({ error: 'You have exceeded the number of allowed requests. Please try again after 25 seconds.'})
        errorLogger.error(`${req.method} ${req.path} throttled. Email:${req.session.email}`)
    }
})

module.exports = { otpLimiter, otpResendLimiter }