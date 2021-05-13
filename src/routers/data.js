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
const Contribution = require('../models/contribution')

const dataRouter = express.Router()

dataRouter.post('/data/contributions/:id', async (req, res) => {
    try {
        const contribution =  await Contribution.findById(req.params.id)
        if (!contribution) {
            return res.status(400).send()
        }
        const contributionObject = contribution.toObject()
        const serviceModel = mongoose.model(contributionObject.Service)
        const unecessaryFields = ['_id', '__v', 'Valid', 'Service']
        unecessaryFields.forEach((field) => {
            delete contributionObject[field]
        })
        const service = new serviceModel(contributionObject)
        await service.save()
        await contribution.delete()
        res.status(200).send()
        successLogger.info(`POST /data/contributions/${req.params.id} success. IP:${req.ip}`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`POST /data/contributions/${req.paramas.id} failed. Error:${e}`)
    }
})

dataRouter.get('/data/contributions', admin, async (req, res) => {
    try {
        const contributions = await Contribution.find({ })
        res.render('contributions', {
            contributions
        })
        successLogger.info(`GET /data/contributions success. IP:${req.ip}`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /data/contributions failed. Error:${e}`)
    }
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

dataRouter.get('/data/privacy', (req, res) => {
    res.render('privacy', {
        service: req.session.service
    })
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

dataRouter.delete('/data/contributions/:id', async (req, res) => {
    try {
        await Contribution.findByIdAndDelete(req.params.id)
        res.status(200).send()
        successLogger.info(`DELETE /data/contributions/${req.params.id} success. IP:${req.ip}`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`DELETE /data/contributions/${req.params.id} failed. Error:${e}`)
    }
})


module.exports = dataRouter