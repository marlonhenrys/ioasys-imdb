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

  findAll: (offset, limit, conditions) => Film.findAll({
    offset,
    limit,
    include: {
      association: 'genres',
      attributes: ['name'],
      through: {
        attributes: []
      },
      where: conditions.genre
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

}
