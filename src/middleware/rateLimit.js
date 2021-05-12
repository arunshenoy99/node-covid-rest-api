const rateLimit = require('express-rate-limit')

const { errorLogger } = require('../utils/logger')

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    headers: true,
    handler(req, res) {
        if (req.method == 'GET') {
            res.status(429).render('throttled', {
                displayService: req.session.displayService,
                seconds: 'some time'
            })
        } else {
            res.status(429).send()
        }
        errorLogger.error(`${req.method} ${req.path} throttled.`)
    }
})

module.exports = apiLimiter