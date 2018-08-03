const Sequelize = require('sequelize')
const db = require('../database')

const Legislature = db.define('legislature', {
  legislatureId: Sequelize.INTEGER,
  startingDate: Sequelize.DATE,
  endingDate: Sequelize.DATE
})

module.exports = Legislature
