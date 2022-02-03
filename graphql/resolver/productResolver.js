const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    hello () {
        return {text: 'hello'}
    }
}