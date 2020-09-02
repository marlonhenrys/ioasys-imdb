const { Model, DataTypes } = require('sequelize')

class Participation extends Model {
  static init (sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM([
          'Diretor',
          'Produtor',
          'Roteirista',
          'Ator'
        ]),
        allowNull: false
      }
    }, {
      sequelize
    })
  }

  static associate (models) {
    this.belongsTo(models.Film, { as: 'film' })
    this.belongsTo(models.Person, { as: 'person' })
  }
}

module.exports = Participation
