const fs = require('fs')
const path = require('path')

const winston = require('winston')
require('winston-daily-rotate-file')

const consoleConfig = [
    new winston.transports.Console({
        colorize: true
    })
]

const createLogger = winston.createLogger({
    transports: consoleConfig
})

const successLogger = createLogger

successLogger.add(new winston.transports.DailyRotateFile({
    'name': 'access-file',
    'level': 'info',
    'filename': 'logs/access.log',
    'datePattern': 'DD-MM-YYYY-',
    'format': winston.format.combine(
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.json()
    )
}))

const errorLogger = createLogger

errorLogger.add(new winston.transports.DailyRotateFile({
    'name': 'error-file',
    'level': 'error',
    'filename': 'logs/error.log',
    'datePattern': 'DD-MM-YYYY-',
    'format': winston.format.combine(
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        winston.format.json()
    )
}))

const getLogs = () => {
    let finalLog = {}
    const dirName = path.join(__dirname, '../../logs/')
    const files = fs.readdirSync(dirName)
    files.forEach((file) => {
        const buffer = fs.readFileSync(path.join(dirName, `/${file}`))
        const fileData = buffer.toString().replace(/\r/g, '').split('\n')
        fileData.splice(-1, 1)
        let logData = []
        fileData.forEach((data) => {
            logData.push(JSON.parse(data))
        })
        finalLog[file] = logData
    })
    return finalLog
}

module.exports = { successLogger, errorLogger, getLogs }