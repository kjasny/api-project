'use strict'

const fieldMLIData = require('../data/fieldMLIData')
const crematoriesData = require('../data/crematoriesData')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('fieldMLIs', fieldMLIData)

    return queryInterface.bulkInsert('crematories', crematoriesData)
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('crematories')

    return queryInterface.bulkDelete('fieldMLIs')
  }
}
