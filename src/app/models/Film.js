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
      genre: {
        type: DataTypes.STRING,
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
}

module.exports = Film
