const mongoose = require('mongoose')
const { saveData } = require('../utils/data')
const { phoneNumber } = require('../utils/validators')

const plasmaSchema = new mongoose.Schema({
    'Name': {
        type: String,
        required: true,
        trim: true,
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
        type: String
    },
    'Timestamp': {
        type: Number,
        default: Date.now()
    },
})

plasmaSchema.methods.saveData = function () {
    const plasma = this.toObject()
    delete plasma._id
    const status = saveData('plasma', plasma)
    return status
}

const Plasma = mongoose.model('Plasma', plasmaSchema)

module.exports = Plasma