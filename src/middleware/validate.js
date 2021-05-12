const { errorLogger } = require('../utils/logger')

const validate = (req, res, next) => {
    try {
        if (!req.session.email || !req.session.valid) {
            throw new Error()
        }
        if (req.session.service != req.params.service) {
            throw new Error()
        }
        next()
    } catch (e) {
        res.status(401).json({ error: 'Please authenticate yourself.' })
        errorLogger.warn(`${req.method} ${req.path} failed. No authentication provided.`)
    }
}

module.exports = validate