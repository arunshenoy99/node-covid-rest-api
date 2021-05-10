const { errorLogger } = require('../utils/logger')

const validate = (req, res, next) => {
    try {
        if (!req.session.email || !req.session.valid) {
            throw new Error()
        }
        next()
    } catch (e) {
        res.status(401).json({ error: 'Please authenticate yourself.' })
        errorLogger.warn('validate middlware failed.')
    }
}

module.exports = validate