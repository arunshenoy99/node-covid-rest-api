const mongoose = require('mongoose')
const { saveData } = require('../utils/file')
const { phoneNumber } = require('../utils/validators')

const plasmaSchema = new mongoose.Schema({
    'Name': {
        type: String,
        required: true,
        trim: true,
    },
    'Phone Number': {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 10,
        validate: {
            validator: phoneNumber,
            message: 'Phone number must not contain alphabets.'
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
    'Status': {
        type: String
    }
})

plasmaSchema.methods.saveData = function () {
    const plasma = this.toObject()
    delete plasma._id
    const status = saveData('plasma', plasma)
    return status
}

const Plasma = mongoose.model('Plasma', plasmaSchema)

module.exports = Plasma