const fs = require('fs')
const path = require('path')
const validator = require('validator')
const { isValidPhoneNumber } = require('libphonenumber-js')

const phoneNumber = (value) => {
    return isValidPhoneNumber(value, 'IN')
}

const lettersOnly = (value) => {
    return validator.isAlpha(value)
}

const cities = (value) => {
    if (!validator.isAlpha(value)) {
        return false
    }
    const buffer = fs.readFileSync(path.join(__dirname, '../data/cities.json'))
    const validCities = JSON.parse(buffer)
    const city = new RegExp(`^${value}$`, 'i')
    var isValidCity = false
    validCities.forEach((validCity) => {
        if (validCity.match(city)) {
            isValidCity = true
            return
        }
    })
    return isValidCity
}

module.exports = { phoneNumber, lettersOnly, cities }