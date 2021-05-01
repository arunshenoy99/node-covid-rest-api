const phoneNumber = (value) => {
    return /^\d+$/.test(value)
}

module.exports = { phoneNumber }