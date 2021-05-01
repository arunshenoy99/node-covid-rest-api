const mongoose = require('mongoose')
const { saveData } = require('../utils/file')
const { phoneNumber } = require('../utils/validators')

const injectionSchema = new mongoose.Schema({
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

injectionSchema.methods.saveData = function () {
    const injection = this.toObject()
    delete injection._id
    const status = saveData('injection', injection)
    return status
}

const Injection = mongoose.model('Injection', injectionSchema)

module.exports = Injection