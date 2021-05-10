const express = require('express')

const { getData, getAllData } = require('../utils/data')
const { successLogger, errorLogger } = require('../utils/logger')
const admin = require('../middleware/admin')

const dataRouter = express.Router()

dataRouter.get('/data/links', (req, res) => {
    const links = getData('links')
    res.json(links)
    successLogger.info('/data/links success.')
})

dataRouter.get('/data/backup', admin, (req, res) => {
    try {
        const backup = getAllData('../data/')
        res.json(backup)
        successLogger.info('/data/backup success.')
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`/data/backup fail: ${e}`)
    }
})

dataRouter.get('/data/:service', (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        return res.status(404).json({ error: 'The requested service was not found.' })
    }
    const data = getData(service)
    res.json(data)
    successLogger.info(`/data/${service} success.`)
})

module.exports = dataRouter