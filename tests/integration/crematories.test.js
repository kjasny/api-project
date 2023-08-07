const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  describe, it, afterEach, beforeEach, after, before
} = require('mocha')

const { getAllCrematoriesController, getCrematoryByIdController, addNewCrematoryController } = require('../../controllers/crematoriesControllers')
const { CrematoriesModel, FieldMLIsModel } = require('../../models/index')

const { crematoriesMock, singleWithIdCrematoryMock, singleWithoutIdCrematoryMock, invalidCrematory } = require('./crematories.mocks')

chai.use(sinonChai)
const { expect } = chai

describe('Integration Tests - crematories', () => {
  let stubbedSend
  let sandbox
  let stubbedFindAll
  let stubbedFindOne
  let stubbedCreate
  let stubbedStatus
  let response
  let stubbedSendStatus

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedSend = sandbox.stub()
    stubbedFindAll = sandbox.stub(CrematoriesModel, 'findAll')
    stubbedFindOne = sandbox.stub(CrematoriesModel, 'findOne')
    stubbedCreate = sandbox.stub(CrematoriesModel, 'create')
    stubbedStatus = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    response = {
      send: stubbedSend,
      status: stubbedStatus,
      sendStatus: stubbedSendStatus
    }
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllCrematoriesController', () => {
    it('retrieves a list of MA crematories from the database, then returns that list in res.send()', async () => {
      stubbedFindAll.returns(crematoriesMock)

      await getAllCrematoriesController({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(crematoriesMock)
    })
    it('returns a 500 error when database is unable to retrieve crematories', async () => {
      stubbedFindAll.throws('ERROR')

      await getAllCrematoriesController({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })

  describe('getCrematoryByIdController', () => {
    it('finds the associated crematory by id then calls res.send with that crematory', async () => {
      stubbedFindOne.returns(singleWithIdCrematoryMock)

      const request = { params: { id: 1 } }

      await getCrematoryByIdController(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 }, include: [{ model: FieldMLIsModel }] })
      expect(stubbedSend).to.have.been.calledWith(singleWithIdCrematoryMock)
    })
    it('Crematory is not found in the database, and returns a 500 error', async () => {
      stubbedFindOne.throws('ERROR!')

      const request = { params: { id: -1 } }

      await getCrematoryByIdController(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: -1 }, include: [{ model: FieldMLIsModel }] })
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
    it('Crematory is not found in the database, and returns a 404 error', async () => {
      stubbedFindOne.returns({})

      const request = { params: { id: -1 } }

      await getCrematoryByIdController(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: -1 }, include: [{ model: FieldMLIsModel }] })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })

  describe('addNewCrematoryController', () => {
    it('accepts new crematory and saves it, sends 201 status', async () => {
      stubbedCreate.returns(singleWithoutIdCrematoryMock)
      stubbedStatus.returns({ send: stubbedSend })

      const request = { body: singleWithoutIdCrematoryMock }

      await addNewCrematoryController(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleWithoutIdCrematoryMock)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleWithoutIdCrematoryMock)
    })
    it('Lets the user know they did not impute a valid new crematory', async () => {
      stubbedStatus = sinon.stub().returns({ send: stubbedSend })

      response = { status: stubbedStatus }
      const request = { body: invalidCrematory }

      await addNewCrematoryController(request, response)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedSend).to.have.been.calledWith('All fields are required to add a crematory')
    })
  })
})
