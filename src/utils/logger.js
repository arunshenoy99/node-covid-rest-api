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

module.exports = { successLogger, errorLogger }