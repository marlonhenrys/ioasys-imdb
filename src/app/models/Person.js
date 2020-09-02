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
      sequelize,
      tableName: 'persons'
    })
  }

  static associate (models) {
    this.belongsToMany(models.Film, { foreignKey: 'person_id', through: models.Participation, as: 'films' })
    this.hasMany(models.Participation, { foreignKey: 'person_id', as: 'participations' })
  }
}

module.exports = Person
