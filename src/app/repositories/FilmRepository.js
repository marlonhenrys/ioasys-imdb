const { Film } = require('../models')

module.exports = {

  create: film => Film.create(film),

  findById: id => Film.findByPk(id, {
    include: [
      {
        association: 'genres',
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
      },
      {
        association: 'persons',
        attributes: ['id', 'name'],
        through: {
          attributes: ['role']
        }
      }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  }),

  findAll: (options, conditions) => Film.findAll({
    options,
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
