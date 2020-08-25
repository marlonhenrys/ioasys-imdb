const genreRepository = require('../../repositories/GenreRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

module.exports = async data => {
  const genre = await genreRepository.findById(data.id)

  if (!genre) {
    throw new ApplicationError('Gênero não encontrado', HttpStatus.NOT_FOUND)
  }

  genre.name = data.name
  await genre.save()
}
