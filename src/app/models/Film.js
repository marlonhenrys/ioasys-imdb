const { Model, DataTypes } = require('sequelize')

class Film extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      duration: {
        type: DataTypes.TIME,
        allowNull: false
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      },
      release: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      average_ratings: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsToMany(models.Genre, { foreignKey: 'film_id', through: 'film_genres', as: 'genres' })
    this.belongsToMany(models.Person, { foreignKey: 'film_id', through: 'participations', as: 'persons' })
    this.belongsToMany(models.User, { foreignKey: 'film_id', through: 'ratings', as: 'votes' })
  }
}

module.exports = Film
