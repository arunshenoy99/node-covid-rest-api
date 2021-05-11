const { errorLogger } = require('../utils/logger')
const admin = (req, res, next) => {
    try {
        if (!req.query.token) {
            throw new Error()
        }

        if (req.query.token != process.env.ADMIN_TOKEN) {
            throw new Error()
        }

        next()
    } catch(e) {
        res.status(401).json({ error: 'The requested service was not found.' })
        errorLogger.warn(`${req.method} ${req.path} failed. Token:${req.query.token}`)
    } 
}

module.exports = admin