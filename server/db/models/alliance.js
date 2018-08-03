const Sequelize = require('sequelize')
const db = require('../database')

const Alliance = db.define('alliance', {
  name: Sequelize.STRING
})

module.exports = Alliance
