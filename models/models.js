const { CrematoriesModel, FieldMLIsModel } = require('./index')
const Sequelize = require('sequelize')

const getAllCrematories = async () => {
  try { const allCrematories = await CrematoriesModel.findAll({ include: { model: FieldMLIsModel } })

    return allCrematories
  } catch (error) {
    throw new Error('ERROR!')
  }
}

const getCrematoryByID = async (id) => {
  try { const foundCrematory = await CrematoriesModel.findOne({
    where: { id },
    include: [{ model: FieldMLIsModel }]
  })

  return foundCrematory
  } catch (error) {
    throw new Error('ERROR!')
  }
}

const getAllFieldMLIs = async () => {
  try { const allFieldMLIs = await FieldMLIsModel.findAll({
    include: { model: CrematoriesModel }
  })

  return allFieldMLIs
  } catch (error) {
    throw new Error('ERROR!')
  }
}

const getFoundFieldMLIBySearchTerm = async (searchTerm) => {
  try { const foundFieldMLI = await FieldMLIsModel.findAll({
    where: {
      [Sequelize.Op.or]: [
        { id: searchTerm },
        { lastName: { [Sequelize.Op.like]: `%${searchTerm}%` } }]
    },
    include: [{ model: CrematoriesModel }]
  })

  return foundFieldMLI
  } catch (error) {
    throw new Error('ERROR')
  }
}

const addNewCrematory = async (newCrematory) => {
  const addedCrematory = await CrematoriesModel.create(newCrematory)

  return addedCrematory
}





module.exports = {
  getAllCrematories, getCrematoryByID, addNewCrematory, getAllFieldMLIs, getFoundFieldMLIBySearchTerm
}
