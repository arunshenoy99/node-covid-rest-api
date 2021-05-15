const express = require('express')
const mongoose = require('mongoose')

const { successLogger, errorLogger } = require('../utils/logger')
const validate = require('../middleware/validate')
const Contribution = require('../models/contribution')
require('../models/ambulance')
require('../models/food')
require('../models/hospitals')
require('../models/injection')
require('../models/oxygen')
require('../models/plasma')

const router = express.Router()

router.post('/:service', validate, async (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        return res.status(404).json({ error: 'The requested service was not found' })
    }
    const contribution = new Contribution(req.body)
    try {
        await contribution.saveData(req.session.email, service)
        res.status(201).send()
        successLogger.info(`${req.method} ${req.path} success. Email:${req.session.email}`)
    } catch (e) {
        if (e.code == 11000) {
            return res.status(400).json({ duplicate: true })
        }
        res.status(400).send(e)
    }
})

router.get('/:service', (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        return res.status(404).json({ error: 'The requested service was not found' })
    }
    req.session.service = service
    req.session.displayService = service.charAt(0).toUpperCase() + service.slice(1)
    res.render('email', {
        displayService: req.session.displayService
    })
    successLogger.info(`GET /${service} success.`)
})

router.get('/:service/form', validate, (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    if (service != req.session.service) {
        req.session.service = service
        req.session.displayService = service.charAt(0).toUpperCase() + service.slice(1)
    }
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        return res.status(404).json({ error: 'The requested service was not found' })
    }
    try {
        const unecessaryFields = ['__v', '_id', 'Contributor', 'Status', 'Description', 'Timestamp']
        const serviceSchema = Object.keys(mongoose.model(service).schema.paths)
        const serviceFields = serviceSchema.filter((field) => !unecessaryFields.includes(field))
        res.render('service', {
            serviceFields,
            displayService: req.session.displayService
        })
        successLogger.info(`GET /${service}/form success. Email:${req.session.email}`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /${service}/form failed. Email:${req.session.email}, Valid:${req.session.valid}, Error: ${e.message}`)
    }
})

module.exports = router