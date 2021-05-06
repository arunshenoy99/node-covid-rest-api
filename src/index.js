const express = require('express')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')

const serviceRouter = require('./routers/service')
const otpRouter = require('./routers/otp')
const dataRouter = require('./routers/data')

const apiLimiter = require('./middleware/rateLimit')

const app = express()

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(cookieParser())
app.use(session({ secret: process.env.SESSION_TOKEN, resave: false, saveUninitialized: true }))
app.use(express.static(publicPath))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(apiLimiter)
app.use(otpRouter)
app.use(serviceRouter)
app.use(dataRouter)

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

hbs.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.inverse(this) : options.fn(this);
});

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.get('*', (req, res) => {
    res.status(404).json( { error: 'The requested service was not found.' } )
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server is up and running !')
})