const mongoose = require('mongoose')
const { saveData } = require('../utils/data')
const { phoneNumber } = require('../utils/validators')

const ambulanceSchema = new mongoose.Schema({
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
        type: String
    },
    'Timestamp': {
        type: Number,
        default: Date.now()
    }
})

ambulanceSchema.methods.saveData = function (contributor) {
    const ambulance = this.toObject()
    delete ambulance._id
    ambulance.Contributor = contributor
    const status = saveData('ambulance', ambulance)
    return status
}

const Ambulance = mongoose.model('Ambulance', ambulanceSchema)

module.exports = Ambulance