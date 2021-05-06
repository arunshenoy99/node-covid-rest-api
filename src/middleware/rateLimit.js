const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100,
    message: 'You have exceeded the number of allowed requests. Please try again after 24 hours.',
    headers: true
})

module.exports = apiLimiter