module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('films', 'average_ratings', 'avg_rating')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('films', 'avg_rating', 'average_ratings')
  }
}
