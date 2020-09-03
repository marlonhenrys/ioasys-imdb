const { Film } = require('../models')
const { fn, col } = require('sequelize')

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
        association: 'participations',
        attributes: ['id', 'role'],
        include: {
          association: 'person',
          attributes: ['id', 'name']
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
        attributes: ['id', 'name'],
        through: {
          attributes: []
        }
      },
      {
        association: 'participations',
        where: conditions.participation,
        attributes: [],
        include: {
          association: 'person',
          where: conditions.person,
          attributes: []
        }
      }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  }),

  averageRating: filmId => Film.findByPk(filmId, {
    attributes: ['id', [fn('AVG', col('ratings.value')), 'avg_rating']],
    include: {
      association: 'ratings',
      attributes: []
    },
    group: ['Film.id']
  }),

  graph: () => Film.findAll({
    group: ['avgRating'],
    attributes: ['avgRating', [fn('COUNT', 'avgRating'), 'amount']],
    order: [
      ['avgRating', 'ASC']
    ]
  }),

  ranking: limit => Film.findAll({
    limit,
    order: [
      ['avgRating', 'DESC']
    ],
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
  })

}
