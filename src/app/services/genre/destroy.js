const genreRepository = require('../../repositories/GenreRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

module.exports = async genreId => {
  const genre = await genreRepository.findById(genreId)

  if (!genre) {
    throw new ApplicationError('Gênero não encontrado', HttpStatus.NOT_FOUND)
  }

  await genre.destroy()
}
