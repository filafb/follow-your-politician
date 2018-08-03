const app = require('.')
const PORT = process.env.PORT || 4200 // this can be very useful if you deploy to Heroku!
const { db } = require('./db')

db.sync(
  // { force: true } //drop all the tables
).then(() => {
  console.log('db synced')
  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
})

