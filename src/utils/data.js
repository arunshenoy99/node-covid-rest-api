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
    oldData.unshift(newData)
    const jsonData = JSON.stringify(oldData)
    try {
        fs.writeFileSync(fileName, jsonData)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

const getServiceDetails = (service) => {
    const fileName = path.join(__dirname, `../data/${service}.json`)
    const buffer = fs.readFileSync(fileName)
    const data = JSON.parse(buffer)
    const serviceDetails = Object.keys(data[0])
    return serviceDetails
}

const getAllData = (dataDir) => {
    let data = {}
    const dirName = path.join(__dirname, dataDir)
    const files = fs.readdirSync(dirName)
    files.forEach((file) => {
        const buffer = fs.readFileSync(path.join(dirName, `/${file}`))
        const fileData = JSON.parse(buffer)
        data[file] = fileData
    })
    return data
}

module.exports = { getData, saveData, getServiceDetails, getAllData }