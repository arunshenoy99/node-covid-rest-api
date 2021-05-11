const express = require('express')
const { getServiceDetails } = require('../utils/data')
const { successLogger, errorLogger } = require('../utils/logger')
const validate = require('../middleware/validate')

const Ambulance = require('../models/ambulance')
const Food = require('../models/food')
const Hospitals = require('../models/hospitals')
const Injection = require('../models/injection')
const Oxygen = require('../models/oxygen')
const Plasma = require('../models/plasma')

const router = express.Router()

router.post('/oxygen', validate, async (req, res) => {
    const oxygen = new Oxygen(req.body)
    const errors = oxygen.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = oxygen.saveData(req.session.email)
    if (!status) {
        res.status(500).send()
        return errorLogger.error(`${req.method} ${req.path} failed. Email:${req.session.email}`)
    }
    res.status(201).send()
    successLogger.info(`${req.method} ${req.path} success. Email:${req.session.email}`)
})

router.post('/ambulance', validate, async (req, res) => {
    const ambulance = new Ambulance(req.body)
    const errors = ambulance.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = ambulance.saveData(req.session.email)
    if (!status) {
        res.status(500).send()
        return errorLogger.error(`${req.method} ${req.path} failed. Email:${req.session.email}`)
    }
    res.status(201).send()
    successLogger.info(`${req.method} ${req.path} success. Email:${req.session.email}`)
})

router.post('/food', validate, async (req, res) => {
    const food = new Food(req.body)
    const errors = food.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = food.saveData(req.session.email)
    if (!status) {
        res.status(500).send()
        return errorLogger.error(`${req.method} ${req.path} failed. Email:${req.session.email}`)
    }
    res.status(201).send()
    successLogger.info(`${req.method} ${req.path} success. Email:${req.session.email}`)
})

router.post('/hospitals', validate, async (req, res) => {
    const hospitals = new Hospitals(req.body)
    const errors = hospitals.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = hospitals.saveData(req.session.email)
    if (!status) {
        res.status(500).send()
        return errorLogger.error(`${req.method} ${req.path} failed. Email:${req.session.email}`)
    }
    res.status(201).send()
    successLogger.info(`${req.method} ${req.path} success. Email:${req.session.email}`)
})

router.post('/injection', validate, async (req, res) => {
    const injection = new Injection(req.body)
    const errors = injection.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = injection.saveData(req.session.email)
    if (!status) {
        res.status(500).send()
        return errorLogger.error(`${req.method} ${req.path} failed. Email:${req.session.email}`)
    }
    res.status(201).send()
    successLogger.info(`${req.method} ${req.path} success. Email:${req.session.email}`)
})

router.post('/plasma', validate, async (req, res) => {
    const plasma = new Plasma(req.body)
    const errors = plasma.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = plasma.saveData(req.session.email)
    if (!status) {
        res.status(500).send()
        return errorLogger.error(`${req.method} ${req.path} failed. Email:${req.session.email}`)
    }
    res.status(201).send()
    successLogger.info(`${req.method} ${req.path} success. Email:${req.session.email}`)
})


router.get('/:service', (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        res.status(404).json({ error: 'The requested service was not found' })
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
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        res.status(404).json({ error: 'The requested service was not found' })
    }
    try {
        const serviceDetails = getServiceDetails(service)
        const displayService = service.charAt(0).toUpperCase() + service.slice(1)
        res.render('service.hbs', {
            serviceDetails,
            displayService,
            service
        })
        successLogger.info(`GET /${service}/form success. Email:${req.session.email}`)
    } catch (e) {
        res.status(500).send()
        errorLogger.error(`GET /${service}/form failed. Email:${req.session.email}, Valid:${req.session.valid}, Error: ${e.message}`)
    }
})

module.exports = router