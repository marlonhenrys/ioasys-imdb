const { Model, DataTypes } = require('sequelize')

class Person extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      biography: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsToMany(models.Film, { foreignKey: 'person_id', through: 'participations', as: 'films' })
  }
}

module.exports = Person
