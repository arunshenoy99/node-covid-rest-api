const mongoose = require('mongoose')
const { saveData } = require('../utils/file')

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
        maxlength: 10
    },
    'Area Name': {
        type: String,
        trim: true
    },
    'Status': {
        type: String,
        required: true,
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