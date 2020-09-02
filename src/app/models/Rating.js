const { Model, DataTypes } = require('sequelize')

class Rating extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Film, { as: 'film' })
    this.belongsTo(models.User, { as: 'user' })
  }
}

module.exports = Rating
