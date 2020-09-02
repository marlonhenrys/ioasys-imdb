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

  findByIdWithAvgRating: id => Film.findByPk(id, {
    include: [
      {
        association: 'votes',
        attributes: [],
        through: {
          attributes: [[fn('AVG', col('value')), 'avg_rating']]
        }
      }
    ],
    attributes: []
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
  })

}
