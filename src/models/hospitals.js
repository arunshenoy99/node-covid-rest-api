const mongoose = require('mongoose')
const { saveData } = require('../utils/file')
const { phoneNumber } = require('../utils/validators')

const hospitalsSchema = new mongoose.Schema({
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
        type: String,
    }
})

hospitalsSchema.methods.saveData = function () {
    const hospitals = this.toObject()
    delete hospitals._id
    const status = saveData('hospitals', hospitals)
    return status
}

const Hospitals = mongoose.model('Hospitals', hospitalsSchema)

module.exports = Hospitals