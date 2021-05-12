const mongoose = require('mongoose')

const hospitalsSchema = new mongoose.Schema({
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

hospitalsSchema.methods.toJSON = function () {
    const service = this
    const serviceObject = service.toObject()
    delete serviceObject._id
    delete serviceObject.Contributor
    return serviceObject
}

mongoose.model('hospitals', hospitalsSchema)