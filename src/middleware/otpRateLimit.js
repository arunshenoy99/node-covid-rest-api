const rateLimit = require('express-rate-limit')

const { errorLogger } = require('../utils/logger')

const otpLimiter = rateLimit({
    windowMs: 60000,
    max: 10,
    headers: true,
    handler(req, res) {
        if (req.method == 'GET') {
            res.status(429).render('throttled', {
                displayService: req.session.displayService,
                seconds: '60 seconds'
            })
        } else {
            res.status(429).send()
        }
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