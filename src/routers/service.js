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
        return errorLogger.error(`Error saving data oxygen for ${req.session.email}.`)
    }
    res.status(201).send()
    successLogger.info(`New oxygen data from ${req.session.email}.`)
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
        return errorLogger.error(`Error saving data ambulance for ${req.session.email}.`)
    }
    res.status(201).send()
    successLogger.info(`New ambulance data from ${req.session.email}.`)
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
        return errorLogger.error(`Error saving data food for ${req.session.email}.`)
    }
    res.status(201).send()
    successLogger.info(`New food data from ${req.session.email}.`)
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
        return errorLogger.error(`Error saving data hospitals for ${req.session.email}.`)
    }
    res.status(201).send()
    successLogger.info(`New hospitals data from ${req.session.email}.`)
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
        return errorLogger.error(`Error saving data injection for ${req.session.email}.`)
    }
    res.status(201).send()
    successLogger.info(`New injection data from ${req.session.email}.`)
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
        return errorLogger.error(`Error saving data plasma for ${req.session.email}.`)
    }
    res.status(201).send()
    successLogger.info(`New plasma data from ${req.session.email}.`)
})


router.get('/:service', (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        res.status(404).json({ error: 'The requested service was not found' })
        return successLogger.info(`Someone tried to access /${service}.`)
    }
    req.session.service = service
    req.session.displayService = service.charAt(0).toUpperCase() + service.slice(1)
    res.render('email', {
        displayService: req.session.displayService
    })
    successLogger.info(`/${service} success.`)
})

router.get('/:service/form', validate, (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        res.status(404).json({ error: 'The requested service was not found' })
        return successLogger.info(`Someone tried to access /${service}/form.`)
    }
    const serviceDetails = getServiceDetails(service)
    const displayService = service.charAt(0).toUpperCase() + service.slice(1)
    res.render('service.hbs', {
        serviceDetails,
        displayService,
        service
    })
    successLogger.info(`/${service}/form success.`)
})

module.exports = router