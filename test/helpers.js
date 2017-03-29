require('should')

const helpers = require('../lib/helpers/helpers')

describe('helpers', function () {
  it('env', function (done) {
    helpers.should.be.an.Object()
    done()
  })

  describe('normalizeId', function () {
    it('should return a string', function (done) {
      helpers.normalizeId('Q571').should.be.a.String()
      helpers.normalizeId('P50').should.be.a.String()
      helpers.normalizeId('571').should.be.a.String()
      done()
    })

    it('should return a Q id by default', function (done) {
      helpers.normalizeId('Q571').should.equal('Q571')
      helpers.normalizeId('571').should.equal('Q571')
      helpers.normalizeId('571').should.equal('Q571')
      done()
    })

    it('should return a numeric id if requested', function (done) {
      helpers.normalizeId('Q571', true).should.equal('571')
      helpers.normalizeId('571', true).should.equal('571')
      done()
    })

    it('should return a Q id in the other case', function (done) {
      helpers.normalizeId('Q571', false).should.equal('Q571')
      helpers.normalizeId('571', false).should.equal('Q571')
      done()
    })

    it('should return a P id if requested', function (done) {
      helpers.normalizeId('P50', false, 'P').should.equal('P50')
      helpers.normalizeId('50', false, 'P').should.equal('P50')
      done()
    })

    it('should return a Q in the other case', function (done) {
      helpers.normalizeId('Q571', false, 'Q').should.equal('Q571')
      helpers.normalizeId('571', false, 'Q').should.equal('Q571')
      done()
    })

    it('should have no type with numeric id anyway', function (done) {
      helpers.normalizeId('Q571', true, 'Q').should.equal('571')
      helpers.normalizeId('571', true, 'Q').should.equal('571')
      helpers.normalizeId('Q50', true, 'P').should.equal('50')
      helpers.normalizeId('50', true, 'P').should.equal('50')
      helpers.normalizeId('50', true, 'anything').should.equal('50')
      done()
    })
  })

  const ISOtime = '2014-05-14T00:00:00.000Z'
  const wdTime = '+2014-05-14T00:00:00Z'
  const epoch = 1400025600000
  const ISOnegativeTime = '-000044-03-15T00:00:00.000Z'
  const negativeWdTime = '-0044-03-15T00:00:00Z'
  const negativeEpoch = -63549360000000

  describe('normalizeWikidataTime', function () {
    it('env', function (done) {
      new Date(epoch).toISOString().should.equal(ISOtime)
      new Date(negativeEpoch).toISOString().should.equal(ISOnegativeTime)
      done()
    })

    it('should return a number (epoch time)', function (done) {
      helpers.normalizeWikidataTime(wdTime).should.be.a.Number()
      done()
    })

    it('should return a number for negative time', function (done) {
      helpers.normalizeWikidataTime(negativeWdTime).should.be.a.Number()
      done()
    })

    it('should return the right number', function (done) {
      helpers.normalizeWikidataTime(wdTime).should.equal(epoch)
      done()
    })

    it('should return the right number for negative time too', function (done) {
      helpers.normalizeWikidataTime(negativeWdTime).should.equal(negativeEpoch)
      done()
    })
  })
  describe('isEntityId', function () {
    it('should accept both item and property ids', function (done) {
      helpers.isEntityId('Q571').should.be.true()
      helpers.isEntityId('P31').should.be.true()
      helpers.isEntityId('31').should.be.false()
      helpers.isEntityId(31).should.be.false()
      helpers.isEntityId('Z31').should.be.false()
      helpers.isEntityId('q31').should.be.false()
      helpers.isEntityId('p31').should.be.false()
      done()
    })
  })
  describe('isItemId', function () {
    it('should accept both item and property ids', function (done) {
      helpers.isItemId('Q571').should.be.true()
      helpers.isItemId('P31').should.be.false()
      helpers.isItemId('31').should.be.false()
      helpers.isItemId(31).should.be.false()
      helpers.isItemId('Z31').should.be.false()
      helpers.isItemId('q31').should.be.false()
      helpers.isItemId('p31').should.be.false()
      done()
    })
  })
  describe('isPropertyId', function () {
    it('should accept both item and property ids', function (done) {
      helpers.isPropertyId('P31').should.be.true()
      helpers.isPropertyId('Q571').should.be.false()
      helpers.isPropertyId('31').should.be.false()
      helpers.isPropertyId(31).should.be.false()
      helpers.isPropertyId('Z31').should.be.false()
      helpers.isPropertyId('q31').should.be.false()
      helpers.isPropertyId('p31').should.be.false()
      done()
    })
  })
})
