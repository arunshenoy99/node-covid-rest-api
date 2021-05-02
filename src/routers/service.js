const express = require('express')
const { getData, getServiceDetails } = require('../utils/data')

const Ambulance = require('../models/ambulance')
const Food = require('../models/food')
const Hospitals = require('../models/hospitals')
const Injection = require('../models/injection')
const Oxygen = require('../models/oxygen')
const Plasma = require('../models/plasma')

const router = express.Router()

router.post('/oxygen', async (req, res) => {
    const oxygen = new Oxygen(req.body)
    const errors = oxygen.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = oxygen.saveData()
    if (!status) {
        return res.status(500).send()
    }
    res.status(201).send()
})

router.post('/ambulance', async (req, res) => {
    const ambulance = new Ambulance(req.body)
    const errors = ambulance.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = ambulance.saveData()
    if (!status) {
        return res.status(500).send()
    }
    res.status(201).send()
})

router.post('/food', async (req, res) => {
    const food = new Food(req.body)
    const errors = food.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = food.saveData()
    if (!status) {
        return res.status(500).send()
    }
    res.status(201).send()
})

router.post('/hospitals', async (req, res) => {
    const hospitals = new Hospitals(req.body)
    const errors = hospitals.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = hospitals.saveData()
    if (!status) {
        return res.status(500).send()
    }
    res.status(201).send()
})

router.post('/injection', async (req, res) => {
    const injection = new Injection(req.body)
    const errors = injection.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = injection.saveData()
    if (!status) {
        return res.status(500).send()
    }
    res.status(201).send()
})

router.post('/plasma', async (req, res) => {
    const plasma = new Plasma(req.body)
    const errors = plasma.validateSync()
    if (errors) {
        return res.status(400).send(errors)
    }
    const status = plasma.saveData()
    if (!status) {
        return res.status(500).send()
    }
    res.status(201).send()
})

router.post('*', (req, res) => {
    res.status(404).json( { error: 'The requested service was not found.' } )
})

router.get('/:service', (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        return res.status(404).json({ error: 'The requested service was not found.' })
    }
    const data = getData(service)
    res.json(data)
})

router.get('/:service/form', (req, res) => {
    const allowedServices = ['ambulance', 'food', 'injection', 'plasma', 'hospitals', 'oxygen']
    const service = req.params.service
    const isValid = allowedServices.includes(service)
    if (!isValid) {
        return res.status(404).json({ error: 'The requested service was not found' })
    }
    const serviceDetails = getServiceDetails(service)
    const displayService = service.charAt(0).toUpperCase() + service.slice(1)
    res.render('service.hbs', {
        serviceDetails,
        displayService,
        service
    })
})

module.exports = router