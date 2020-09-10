const filmRepository = require('../../repositories/FilmRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')
const genreService = require('../genre')
const personService = require('../person')

module.exports = async data => {
  const film = await filmRepository.findById(data.id)

  if (!film) {
    throw new ApplicationError('Filme não encontrado', HttpStatus.NOT_FOUND)
  }

  if (data.name) {
    film.name = data.name
  }
  if (data.synopsis) {
    film.synopsis = data.synopsis
  }
  if (data.duration) {
    film.duration = data.duration
  }
  if (data.language) {
    film.language = data.language
  }
  if (data.release) {
    film.release = data.release
  }

  if (data.genres) {
    const genres = await genreService.findMany(data.genres)

    const currentGenres = await film.getGenres()
    await film.removeGenres(currentGenres)

    await film.setGenres(genres)
  }

  if (data.persons) {
    const participations = await personService.findMany(data.persons)

    const currentPersons = await film.getPersons()
    await film.removePersons(currentPersons)

    for (const { person: { id: personId }, role } of participations) {
      await film.createParticipation({ personId, role })
    }
  }

  if (data.fileName) {
    film.coverUrl = `${process.env.APP_URL}/files/${data.fileName}`
  }

  await film.save()
}
