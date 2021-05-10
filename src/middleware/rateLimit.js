const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'You have exceeded the number of allowed requests. Please try again in some time.',
    headers: true
})

module.exports = apiLimiter