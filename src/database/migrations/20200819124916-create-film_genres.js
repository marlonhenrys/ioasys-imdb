'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('film_genres', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      film_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'films', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'genres', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('film_genres')
  }
}
