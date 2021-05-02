const mongoose = require('mongoose')
const { saveData } = require('../utils/data')
const { phoneNumber } = require('../utils/validators')

const injectionSchema = new mongoose.Schema({
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
    }
})

injectionSchema.methods.saveData = function () {
    const injection = this.toObject()
    delete injection._id
    const status = saveData('injection', injection)
    return status
}

const Injection = mongoose.model('Injection', injectionSchema)

module.exports = Injection