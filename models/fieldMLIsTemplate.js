const fieldMLIsTemplate = (connection, Sequelize) => {
  return connection.define('fieldMLIs', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    route: { type: Sequelize.STRING },
  }, { paranoid: true })
}

module.exports = { fieldMLIsTemplate }
