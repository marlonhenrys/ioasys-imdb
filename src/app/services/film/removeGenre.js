const genreRepository = require('../../repositories/GenreRepository')
const filmRepository = require('../../repositories/FilmRepository')
const ApplicationError = require('../../utils/errorHandler')

module.exports = async (filmId, genreId) => {
  const film = await filmRepository.findById(filmId)

  if (!film) {
    throw new ApplicationError('Filme não encontrado', 404)
  }

  const genre = await genreRepository.findById(genreId)

  if (!genre) {
    throw new ApplicationError('Gênero não encontrado', 404)
  }

  await film.removeGenre(genre)
}
