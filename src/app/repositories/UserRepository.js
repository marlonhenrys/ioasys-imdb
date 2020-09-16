const { User } = require('../models')
const { Op } = require('sequelize')

module.exports = {

  create: user => User.create(user),

  findByEmail: email => User.findOne({
    where: {
      email,
      status: {
        [Op.ne]: 'Deleted'
      }
    }
  }),

  findById: id => User.findByPk(id, {
    where: {
      status: {
        [Op.ne]: 'Deleted'
      }
    },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    }
  }),

  findAll: (options, conditions) => User.findAll({
    options,
    where: conditions.user,
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    }
  })

}
