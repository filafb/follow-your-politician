const { db } = require('../../server/db');
const Party = db.models.party;
const Alliance = db.models.alliance
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised'); //await expect to.be rejected
chai.use(chaiAsPromised);

describe('The party model', () => {
  beforeEach('sync DB', () => {
    db.sync();
  });
  afterEach('truncate model', () => {
    Party.truncate();
  });

  describe('has required fields', () => {
    it('shortName and electoralNumber', async () => {
      const PartyShouldCreate = Party.build({
        shortName: 'niceParty',
        electoralNumber: 98,
      });
      const PartyShouldntCreate = Party.build({ name: 'failParty' });
      await expect(PartyShouldCreate.save()).to.be.fulfilled;
      await expect(PartyShouldntCreate.save()).to.be.rejected;
    });
    describe('belongsTo Alliance through associations', () => {
      it('and has setAlliance as a method', async () => {
        const PartyWithAlliance = await Party.create({shortName: 'niceParty', electoralNumber: 98})
        const alliance = await Alliance.create({name: 'niceAlliance'})
        PartyWithAlliance.setAlliance(alliance)
        expect(PartyWithAlliance.allianceId).to.be.equal(alliance.id)
      });
    });
  });
});
