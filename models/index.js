const Sequelize = require('sequelize')
const { crematoriesTemplate } = require('./crematoriesTemplate')
const { fieldMLIsTemplate } = require('./fieldMLIsTemplate')
const configs = require('../configs/sequelize')

const environment = process.env.NODE_ENV || 'development'
const config = configs[environment]
const {
  database, username, password, host, dialect
} = config

const connection = new Sequelize(database, username, password,
  { host, dialect })

const FieldMLIsModel = fieldMLIsTemplate(connection, Sequelize)
const CrematoriesModel = crematoriesTemplate(connection, Sequelize, FieldMLIsModel)

FieldMLIsModel.hasMany(CrematoriesModel)
CrematoriesModel.belongsTo(FieldMLIsModel)

module.exports = { FieldMLIsModel, CrematoriesModel }
