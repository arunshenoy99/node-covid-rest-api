const mongoose = require('mongoose')
const { saveData } = require('../utils/data')
const { phoneNumber } = require('../utils/validators')

const foodSchema = new mongoose.Schema({
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
        maxlength: 1000
    },
    'Status': {
        type: String
    },
    'Timestamp': {
        type: Number,
        default: Date.now()
    }
})

foodSchema.methods.saveData = function () {
    const food = this.toObject()
    delete food._id
    const status = saveData('food', food)
    return status
}

const Food = mongoose.model('Food', foodSchema)

module.exports = Food