const { Film } = require('../models')

module.exports = {

  create: film => Film.create(film),

  findById: id => Film.findByPk(id, {
    include: {
      association: 'genres',
      attributes: ['id', 'name'],
      through: {
        attributes: []
      }
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  }),

  findAll: () => Film.findAll({
    include: {
      association: 'genres',
      attributes: ['name'],
      through: {
        attributes: []
      }
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

}
