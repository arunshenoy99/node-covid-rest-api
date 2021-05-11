const rateLimit = require('express-rate-limit')

const { errorLogger } = require('../utils/logger')

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    headers: true,
    handler(req, res) {
        res.status(429).json({ error: 'You have exceeded the number of allowed requests. Please try again after some time.'})
        errorLogger.error(`${req.method} ${req.path} throttled.`)
    }
})

module.exports = apiLimiter