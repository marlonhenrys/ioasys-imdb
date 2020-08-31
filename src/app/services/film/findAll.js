const filmRepository = require('../../repositories/FilmRepository')
const { Op } = require('sequelize')

module.exports = (page = 1, limit = 10, filters) => {
  const offset = (page - 1) * limit
  const conditions = { film: {}, genre: {}, person: {}, participation: {} }

  if (filters.name) {
    conditions.film.name = {
      [Op.iLike]: '%' + filters.name + '%'
    }
  }
  if (filters.rating) {
    conditions.film.average_ratings = filters.rating
  }

  if (filters.genre) {
    conditions.genre.id = filters.genre
  }

  if (filters.person) {
    conditions.person.name = {
      [Op.iLike]: '%' + filters.person + '%'
    }

    if (filters.role) {
      conditions.participation.role = filters.role
    }
  }

  return filmRepository.findAll({ offset, limit }, conditions)
}
