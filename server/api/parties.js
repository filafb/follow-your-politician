const express = require('express')
const router = express.Router()
const { Party, Alliance } = require ('../db')

module.exports = router

router.get('/', async (req, res, next) => {
  try{
    const partiesP = Party.findAll();
    const alliancesP = Alliance.findAll()
    const values = await Promise.all([partiesP, alliancesP])
    res.send(values)

  } catch(err){
    next(err)
  }
})
