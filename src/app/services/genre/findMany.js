const genreRepository = require('../../repositories/GenreRepository')
const ApplicationError = require('../../utils/errorHandler')

module.exports = async genresIds => {
  const genres = []

  for (const genreId of genresIds) {
    const genre = await genreRepository.findById(genreId)

    if (!genre) {
      throw new ApplicationError(`Gênero de ID ${genreId} não encontrado`, 404)
    }

    genres.push(genre)
  }

  return genres
}
