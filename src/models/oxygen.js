const mongoose = require('mongoose')
const { saveData } = require('../utils/file')
const { phoneNumber } = require('../utils/validators')

const oxygenSchema = new mongoose.Schema({
    'Name': {
        type: String,
        required: true,
        trim: true,
    },
    'Phone': {
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
    'Area Name': {
        type: String,
        trim: true
    },
    'Status': {
        type: String,
    },
    'Remarks': {
        type: String,
        trim: true
    },
    'PIN Code': {
        type: String,
        trim: true
    }
})

oxygenSchema.methods.saveData = function () {
    const oxygen = this.toObject()
    delete oxygen._id
    const status = saveData('oxygen', oxygen)
    return status
}

const Oxygen = mongoose.model('Oxygen', oxygenSchema)

module.exports = Oxygen