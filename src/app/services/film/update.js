const filmRepository = require('../../repositories/FilmRepository')
const { genreService, personService } = require('../../services')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

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
    const currentGenres = await film.getGenres()
    await film.removeGenres(currentGenres)

    const genres = await genreService.findMany(data.genres)

    for (const genre of genres) {
      await film.addGenre(genre)
    }
  }

  if (data.persons) {
    const currentPersons = await film.getPersons()
    await film.removePersons(currentPersons)

    const participations = await personService.findMany(data.persons)

    for (const { person, role } of participations) {
      await film.addPerson(person, { through: { role } })
    }
  }

  await film.save()
}
