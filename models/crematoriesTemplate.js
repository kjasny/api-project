const crematoriesTemplate = (connection, Sequelize, fieldMLIs) => {
  return connection.define('crematories', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING },
    location: { type: Sequelize.STRING },
    fieldMLIId: { type: Sequelize.INTEGER, references: { model: fieldMLIs, key: 'id' }},
    logo: { type: Sequelize.STRING }
  }, { paranoid: true }
)
}

module.exports = { crematoriesTemplate }
