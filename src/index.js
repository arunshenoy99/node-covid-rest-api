const express = require('express')

const serviceRouter = require('./routers/service')

const app = express()

app.use(express.json())

app.use(serviceRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up and running !')
})