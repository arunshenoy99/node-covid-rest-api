const mongoose = require('mongoose')
const { saveData } = require('../utils/file')

const foodSchema = new mongoose.Schema({
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
        maxlength: 10
    },
    'City': {
        type: String,
        trim: true
    },
    'Area': {
        type: String,
        trim: true
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