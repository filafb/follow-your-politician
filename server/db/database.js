const Sequelize = require('sequelize')

const dbName = 'follow-your-politician' + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false // true: log the events in the database
})

module.exports = db
