const mongoose = require('mongoose')
const { saveData } = require('../utils/file')
const { phoneNumber } = require('../utils/validators')

const ambulanceSchema = new mongoose.Schema({
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
    'Location': {
        type: String,
        trim: true
    },
    'Status': {
        type: String
    }
})

ambulanceSchema.methods.saveData = function () {
    const ambulance = this.toObject()
    delete ambulance._id
    const status = saveData('ambulance', ambulance)
    return status
}

const Ambulance = mongoose.model('Ambulance', ambulanceSchema)

module.exports = Ambulance