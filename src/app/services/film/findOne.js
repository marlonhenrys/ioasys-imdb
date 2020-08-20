const filmRepository = require('../../repositories/FilmRepository')
const ApplicationError = require('../../utils/errorHandler')

module.exports = async filmId => {
  const film = await filmRepository.findById(filmId)

  if (!film) {
    throw new ApplicationError('Filme não encontrado', 404)
  }

  return film
}
