const genreRepository = require('../../repositories/GenreRepository')
const { Op } = require('sequelize')

module.exports = (page = 1, limit = 10, filters) => {
  const offset = (page - 1) * limit
  const conditions = { genre: { } }

  if (filters.name) {
    conditions.genre.name = {
      [Op.iLike]: '%' + filters.name + '%'
    }
  }

  return genreRepository.findAll({ offset, limit }, conditions)
}
