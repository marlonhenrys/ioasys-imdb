const genreRepository = require('../../repositories/GenreRepository')
const filmRepository = require('../../repositories/FilmRepository')
const ApplicationError = require('../../utils/errorHandler')

module.exports = async (filmId, genreName) => {
  const film = await filmRepository.findById(filmId)

  if (!film) {
    throw new ApplicationError('Filme não encontrado', 404)
  }

  const [genre] = await genreRepository.findOrCreate(genreName)

  await film.addGenre(genre)
}
