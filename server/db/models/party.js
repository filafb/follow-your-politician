const Sequelize = require('sequelize')
const db = require('../database')

const Party = db.define('party', {
  generalId: {
    type: Sequelize.INTEGER,
  },
  shortName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: Sequelize.STRING,
  },
  electoralNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: Sequelize.TEXT
})

module.exports = Party
