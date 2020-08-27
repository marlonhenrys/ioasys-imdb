const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 254]
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 30]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 254]
        }
      },
      type: {
        type: DataTypes.ENUM('Admin', 'Member'),
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Disabled', 'Deleted'),
        allowNull: true
      }
    }, {
      sequelize
    })
  }

  toJSON () {
    const user = { ...this.get() }
    return Object.fromEntries(Object.entries(user).filter(([key]) => !['password'].includes(key)))
  }
}

module.exports = User
