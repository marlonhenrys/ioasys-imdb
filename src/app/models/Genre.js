const { Model, DataTypes } = require('sequelize')

class Genre extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsToMany(models.Film, { foreignKey: 'genre_id', through: 'film_genres', as: 'films' })
  }
}

module.exports = Genre
