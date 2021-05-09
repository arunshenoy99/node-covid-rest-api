const express = require('express')

const { getData, getAllData } = require('../utils/data')

const dataRouter = express.Router()

dataRouter.get('/data/links', (req, res) => {
    const links = getData('links')
    res.json(links)
})

dataRouter.get('/data/backup', (req, res) => {
    try {
        const backup = getAllData()
        res.json(backup)
    } catch (e) {
        res.status(500).send()
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
})

module.exports = dataRouter