const fs = require('fs')
const path = require('path')

const getData = (service) => {
    const fileName = path.join(__dirname, `../data/${service}.json`)
    const buffer = fs.readFileSync(fileName)
    const data = JSON.parse(buffer)
    return data
}

const saveData = (service, newData) => {
    const fileName = path.join(__dirname, `../data/${service}.json`)
    const buffer = fs.readFileSync(fileName)
    let oldData = JSON.parse(buffer)
    oldData = oldData.concat(newData)
    const jsonData = JSON.stringify(oldData)
    try {
        fs.writeFileSync(fileName, jsonData)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

module.exports = { getData, saveData }