const mongoose = require('mongoose')
const { saveData } = require('../utils/data')
const { phoneNumber } = require('../utils/validators')

const oxygenSchema = new mongoose.Schema({
    'Name': {
        type: String,
        required: true,
        trim: true,
    },
    'Contributor': {
        type: String
    },
    'Phone': {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: phoneNumber,
            message: 'Invalid phone number.'
        }
    },
    'City': {
        type: String,
        trim: true
    },
    'Area': {
        type: String,
        trim: true
    },
    'Description': {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    'Status': {
        type: String,
    },
    'Timestamp': {
        type: Number,
        default: Date.now()
    },
})

oxygenSchema.methods.saveData = function (contributor) {
    const oxygen = this.toObject()
    delete oxygen._id
    oxygen.Contributor = contributor
    const status = saveData('oxygen', oxygen)
    return status
}

const Oxygen = mongoose.model('Oxygen', oxygenSchema)

module.exports = Oxygen