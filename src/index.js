const express = require('express')
const path = require('path')

const serviceRouter = require('./routers/service')

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const app = express()

app.use(express.json())
app.use(express.static(publicPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(serviceRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up and running !')
})