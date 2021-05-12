const mongoose = require('mongoose')
const { phoneNumber, lettersOnly, cities } = require('../utils/validators')

const contributionSchema = new mongoose.Schema({
    'Name': {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: lettersOnly,
            message: 'Invalid Name.'
        }
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
        trim: true,
        validate: {
            validator: cities,
            message: 'Invalid City.'
        }
    },
    'Area': {
        type: String,
        trim: true,
        validate: {
            validator: lettersOnly,
            message: 'Invalid Area.'
        }
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
    },
    'Service': {
        type: String,
        required: true
    },
    'Valid': {
        type: Boolean,
        default: false
    }
})

contributionSchema.methods.saveData = async function (contributor, service) {
    const contribution = this
    contribution.Contributor = contributor
    contribution.Service = service
    await this.save()
}

const Contribution = mongoose.model('contribution', contributionSchema)

module.exports = Contribution