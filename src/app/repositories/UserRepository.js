const { User } = require('../models')

module.exports = {

  create: user => User.create(user),

  findByEmail: email => User.findOne({ where: { email } }),

  findById: id => User.findByPk(id, {
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    }
  }),

  findByUsername: username => User.findOne({
    where: { username },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    }
  }),

  findAll: () => User.findAll({
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    }
  })

}
