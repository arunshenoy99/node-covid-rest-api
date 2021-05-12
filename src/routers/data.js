const fs = require('fs')
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const { successLogger, errorLogger, getLogs } = require('../utils/logger')
const admin = require('../middleware/admin')
require('../models/ambulance')
require('../models/food')
require('../models/hospitals')
require('../models/injection')
require('../models/oxygen')
require('../models/plasma')

const dataRouter = express.Router()

dataRouter.get('/data/privacy', (req, res) => {
    res.render('privacy', {
        service: req.session.service
    })
})

dataRouter.get('/data/links', (req, res) => {
    try {
        const buffer = fs.readFileSync(path.join(__dirname, '../data/links.json'))
        const links = JSON.parse(buffer)
        res.json(links)
        successLogger.info('GET /data/links success.')
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /data/links failed. Error:${e.message}`)
    }
})


dataRouter.get('/data/logs', admin, (req, res) => {
    try {
        const logs = getLogs('../../logs/')
        res.status(200).json(logs)
        successLogger.info(`GET /data/logs success. IP:${req.ip}`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /data/logs failed. Error:${e.message}`)
    }
})

dataRouter.get('/data/:service', async (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        return res.status(404).json({ error: 'The requested service was not found.' })
    }
    try {
        const serviceModel = mongoose.model(service)
        const data = await serviceModel.find({})
        res.json(data)
        successLogger.info(`GET /data/${service} success.`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /data/${service} failed. Error:${e.message}`)
    }
})

module.exports = dataRouter