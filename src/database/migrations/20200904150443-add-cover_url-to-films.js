module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'films',
      'cover_url',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'films',
      'cover_url'
    )
  }
}
