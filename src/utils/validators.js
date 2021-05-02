const { isValidPhoneNumber } = require('libphonenumber-js')

const phoneNumber = (value) => {
    return isValidPhoneNumber(value, 'IN')
}

module.exports = { phoneNumber }