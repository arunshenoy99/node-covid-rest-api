const express = require('express')
const hbs = require('hbs')
const path = require('path')
const { getData } = require('./utils/file')

const serviceRouter = require('./routers/service')

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const app = express()

app.use(express.json())
app.use(express.static(publicPath))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.inverse(this) : options.fn(this);
});

app.use(serviceRouter)

app.get('/data/links', (req, res) => {
    const links = getData('links')
    res.json(links)
})

app.get('*', (req, res) => {
    res.status(404).json( { error: 'The requested service was not found.' } )
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up and running !')
})