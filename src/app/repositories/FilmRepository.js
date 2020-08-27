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
    where: conditions.film,
    include: [
      {
        association: 'genres',
        where: conditions.genre,
        attributes: ['name'],
        through: {
          attributes: []
        }
      },
      {
        association: 'persons',
        where: conditions.person,
        attributes: [],
        through: {
          where: conditions.participation,
          attributes: []
        }
      }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

}
