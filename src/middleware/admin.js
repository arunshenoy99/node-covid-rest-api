const admin = (req, res, next) => {
    try {
        if (!req.body.token) {
            throw new Error()
        }

        if (req.body.token != process.env.ADMIN_TOKEN) {
            throw new Error()
        }

        next()
    } catch(e) {
        res.status(401).json({ error: 'The requested service was not found.' })
    } 
}

module.exports = admin