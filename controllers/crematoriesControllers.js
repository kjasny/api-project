const { getAllCrematories, getCrematoryByID, addNewCrematory } = require('../models/models')

const getAllCrematoriesController = async (request, response) => {
  try { const allCrematories = await getAllCrematories()

    return response.send(allCrematories)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const getCrematoryByIdController = async (request, response) => {
  try { const { id } = request.params

    const foundCrematory = await getCrematoryByID(id)

    return foundCrematory.id ? response.send(foundCrematory) : response.sendStatus(404)
  } catch (error) {
    return response.sendStatus(500)
  }
}

const addNewCrematoryController = async (request, response) => {
  const { name, location, fieldMLIId } = request.body

  if (!name || !location || !fieldMLIId) return response.status(400).send('All fields are required to add a crematory')

  const newCrematory = { name, location, fieldMLIId }

  const addedCrematory = await addNewCrematory(newCrematory)

  return response.status(201).send(addedCrematory)
}

module.exports = { getAllCrematoriesController, getCrematoryByIdController, addNewCrematoryController }
