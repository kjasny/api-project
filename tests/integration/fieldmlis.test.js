const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  describe, it, afterEach, beforeEach, after, before
} = require('mocha')
const Sequelize = require('sequelize')

const {
  getAllFieldMLIsController,
  getFieldMLIBySearchTermWithCrematoriesController,
} = require('../../controllers/fieldMLIsControllers')
const { CrematoriesModel, FieldMLIsModel } = require('../../models/index')

const {
  fieldMLIsMock,
  singleFieldMLIWithIdMock,
} = require('./fieldmlis.mocks')

chai.use(sinonChai)
const { expect } = chai

describe('Integration Tests - fieldMLIs', () => {
  let stubbedSend
  let sandbox
  let stubbedFindAll
  let stubbedStatus
  let response
  let stubbedSendStatus

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedSend = sandbox.stub()
    stubbedFindAll = sandbox.stub(FieldMLIsModel, 'findAll')
    stubbedStatus = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    response = {
      send: stubbedSend,
      status: stubbedStatus,
      sendStatus: stubbedSendStatus,
    }
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllFieldMLIsController', () => {
    it('retrieves a list of MA Field MLIs with their crematories from the database, then returns that list in res.send()', async () => {
      stubbedFindAll.returns(fieldMLIsMock)

      await getAllFieldMLIsController({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(fieldMLIsMock)
    })
    it('returns a 500 error when database is unable to retrieve Field MLIs', async () => {
      stubbedFindAll.throws('ERROR')

      await getAllFieldMLIsController({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })

  describe('getFieldMLIBySearchTermWithCrematoriesController', () => {
    it('finds the associated Field MLI by id or partial last name then calls res.send with that Field MLI', async () => {
      stubbedFindAll.returns(singleFieldMLIWithIdMock)

      const searchTerm = 1
      const request = { params: { searchTerm } }

      await getFieldMLIBySearchTermWithCrematoriesController(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: {
          [Sequelize.Op.or]: [
            { id: searchTerm },
            { lastName: { [Sequelize.Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: [{ model: CrematoriesModel }],
      })
      expect(stubbedSend).to.have.been.calledWith(singleFieldMLIWithIdMock)
    })
    it('Field MLI is not found in the database, and returns a 500 error', async () => {
      stubbedFindAll.throws('ERROR!')

      const searchTerm = 5
      const request = { params: { searchTerm } }

      await getFieldMLIBySearchTermWithCrematoriesController(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: {
          [Sequelize.Op.or]: [
            { id: searchTerm },
            { lastName: { [Sequelize.Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: [{ model: CrematoriesModel }],
      })
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
    it('Field MLI is not found in the database, and returns a 404 error', async () => {
      stubbedFindAll.returns([])

      const searchTerm = 12
      const request = { params: { searchTerm } }

      await getFieldMLIBySearchTermWithCrematoriesController(request, response)

      expect(stubbedFindAll).to.have.been.calledWith({
        where: {
          [Sequelize.Op.or]: [
            { id: searchTerm },
            { lastName: { [Sequelize.Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: [{ model: CrematoriesModel }],
      })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })
})
