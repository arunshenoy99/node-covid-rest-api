const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')

const clientPromise = mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then((m) => m.connection.getClient())

const store = MongoStore.create({
    clientPromise,
    autoRemove: 'interval', 
    autoRemoveInterval: 1440
})

module.exports = store