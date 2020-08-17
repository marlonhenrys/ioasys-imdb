const { Film } = require('../models')

module.exports = {

  create: film => Film.create(film),

  findById: id => Film.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  }),

  findAll: () => Film.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

}
