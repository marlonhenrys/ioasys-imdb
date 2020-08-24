const genreRepository = require('../../repositories/GenreRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

module.exports = async genresIds => {
  const genres = []

  for (const genreId of genresIds) {
    const genre = await genreRepository.findById(genreId)

    if (!genre) {
      throw new ApplicationError(`Gênero de ID ${genreId} não encontrado`, HttpStatus.NOT_FOUND)
    }

    genres.push(genre)
  }

  return genres
}
