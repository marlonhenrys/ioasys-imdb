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
      avgRating: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsToMany(models.Genre, { foreignKey: 'film_id', through: 'film_genres', as: 'genres' })

    this.belongsToMany(models.Person, { foreignKey: 'film_id', through: models.Participation, as: 'persons' })
    this.hasMany(models.Participation, { foreignKey: 'film_id', as: 'participations' })

    this.belongsToMany(models.User, { foreignKey: 'film_id', through: models.Rating, as: 'votes' })
    this.hasMany(models.Rating, { foreignKey: 'film_id', as: 'ratings' })
  }
}

module.exports = Film
