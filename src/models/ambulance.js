const mongoose = require('mongoose')

const ambulanceSchema = new mongoose.Schema({
    'Name': {
        type: String
    },
    'Contributor': {
        type: String
    },
    'Phone': {
        type: String
    },
    'City': {
        type: String
    },
    'Area': {
        type: String
    },
    'Description': {
        type: String
    },
    'Status': {
        type: String
    },
    'Timestamp': {
        type: Number
    }
})

ambulanceSchema.methods.toJSON = function () {
    const service = this
    const serviceObject = service.toObject()
    delete serviceObject._id
    delete serviceObject.Contributor
    return serviceObject
}

mongoose.model('ambulance', ambulanceSchema)