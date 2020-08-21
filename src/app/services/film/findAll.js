const filmRepository = require('../../repositories/FilmRepository')

module.exports = (page = 1, limit = 10, filters) => {
  const offset = (page - 1) * limit
  const conditions = { genre: { } }

  if (filters.genre) {
    conditions.genre.id = filters.genre
  }

  return filmRepository.findAll({ offset, limit }, conditions)
}
