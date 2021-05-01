const mongoose = require('mongoose')
const { saveData } = require('../utils/file')
const { phoneNumber } = require('../utils/validators')

const hospitalsSchema = new mongoose.Schema({
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