const supertest = require('supertest')
const app = require('../../server/index')
const client = supertest(app)
const { expect } = require('chai')
const { db, Party, Alliance } = require('../../server/db')


describe('GET /api/parties', () => {

  beforeEach('sync DB', () => {
    db.sync();
  });
  afterEach('truncate model', () => {
    Party.truncate();
    Alliance.truncate({cascade:true})
  });

  it('responds with 200 and all parties and alliances in the database', async () => {
    const partyCreations = [
      Party.create({shortName: 'party0', electoralNumber:0}),
      Party.create({shortName: 'party1', electoralNumber:1}),
      Alliance.create({name: 'niceAliiance'})
    ]
    await Promise.all(partyCreations)
    const response = await client.get('/api/parties')
    const [parties, alliance] = response.body
    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.an('array')
    parties.forEach((party, idx) =>{
      expect(party).to.have.property('shortName', `party${idx}`)
    })
  })
})
