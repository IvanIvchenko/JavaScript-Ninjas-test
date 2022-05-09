const setup = require('../config/general.config.js')

module.exports = (files) => {
    return files.map(file => {
        return `${setup.url}/public/${file.filename}`
    })
}