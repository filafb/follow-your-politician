const db = require('./database')
const Party = require('./models/party')
const Legislature = require('./models/legislature')
const Alliance = require('./models/alliance')



//associtiations

Alliance.hasMany(Party)
Party.belongsTo(Alliance, {
  targetKey: 'name'
})


module.exports = {
  db,
  Party,
  Legislature,
  Alliance
}
