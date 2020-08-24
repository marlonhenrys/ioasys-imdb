const filmRepository = require('../../repositories/FilmRepository')
const { genreService } = require('../../services')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

module.exports = async data => {
  const film = await filmRepository.findById(data.id)

  if (!film) {
    throw new ApplicationError('Filme não encontrado', HttpStatus.NOT_FOUND)
  }

  if (data.name) { film.name = data.name }
  if (data.synopsis) { film.synopsis = data.synopsis }
  if (data.duration) { film.duration = data.duration }
  if (data.language) { film.language = data.language }
  if (data.release) { film.release = data.release }

  if (data.genres) {
    const currentGenres = await film.getGenres()
    await film.removeGenres(currentGenres)

    const genres = await genreService.findMany(data.genres)

    for (const genre of genres) {
      await film.addGenre(genre)
    }
  }

  await film.save()
}
