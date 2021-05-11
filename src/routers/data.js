const express = require('express')

const { getData, getAllData, getLogsData } = require('../utils/data')
const { successLogger, errorLogger } = require('../utils/logger')
const admin = require('../middleware/admin')

const dataRouter = express.Router()

dataRouter.get('/data/links', (req, res) => {
    try {
        const links = getData('links')
        res.json(links)
        successLogger.info('GET /data/links success.')
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /data/links failed. Error:${e.message}`)
    }
})

dataRouter.get('/data/backup', admin, (req, res) => {
    try {
        const backup = getAllData()
        res.json(backup)
        successLogger.info(`GET /data/backup success. IP:${req.ip}`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /data/backup failed. Error:${e.message}`)
    }
})

dataRouter.get('/data/logs', admin, (req, res) => {
    try {
        const logs = getLogsData('../../logs/')
        res.status(200).json(logs)
        successLogger.info(`GET /data/logs success. IP:${req.ip}`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /data/logs failed. Error:${e.message}`)
    }
})

dataRouter.get('/data/:service', (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        return res.status(404).json({ error: 'The requested service was not found.' })
    }
    try {
        const data = getData(service)
        res.json(data)
        successLogger.info(`GET /data/${service} success.`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /data/${service} failed. Error:${e.message}`)
    }
})

module.exports = dataRouter