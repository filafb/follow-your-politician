const Sequelize = require('sequelize')
const db = require('../database')

const Party = db.define('party', {
  generalId: Sequelize.INTEGER,
  shortName: Sequelize.STRING,
  name: Sequelize.STRING,
  electoralNumber: Sequelize.INTEGER
})

module.exports = Party
