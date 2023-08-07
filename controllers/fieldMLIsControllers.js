const {
  getAllFieldMLIs,
  getFoundFieldMLIBySearchTerm,
} = require('../models/models')

const getAllFieldMLIsController = async (request, response) => {
  try {
    const allFieldMLIs = await getAllFieldMLIs()

    return response.send(allFieldMLIs)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getFieldMLIBySearchTermWithCrematoriesController = async (request,
  response) => {
  try {
    const { searchTerm } = request.params

    const foundFieldMLI = await getFoundFieldMLIBySearchTerm(searchTerm)

    if (foundFieldMLI.length === 0) {
      return response.sendStatus(404)
    } else {
      return response.send(foundFieldMLI)
    }
  } catch (error) {
    response.sendStatus(500)
  }
}

module.exports = {
  getAllFieldMLIsController,
  getFieldMLIBySearchTermWithCrematoriesController,
}
