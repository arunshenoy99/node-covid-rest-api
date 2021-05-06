const rateLimit = require('express-rate-limit')

const otpLimiter = rateLimit({
    windowMs: 60000,
    max: 3,
    message: 'You have exceeded the number of allowed requests. Please try again after 60 seconds.',
    headers: true
})

const otpResendLimiter = rateLimit({
    windowMs: 25000,
    max: 1,
    message: 'You have exceeded the number of allowed requests. Please try again after 25 seconds.',
    headers: true
})

module.exports = { otpLimiter, otpResendLimiter }