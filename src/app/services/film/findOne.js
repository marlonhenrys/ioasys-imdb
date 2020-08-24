const filmRepository = require('../../repositories/FilmRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

module.exports = async filmId => {
  const film = await filmRepository.findById(filmId)

  if (!film) {
    throw new ApplicationError('Filme não encontrado', HttpStatus.NOT_FOUND)
  }

  return film
}
