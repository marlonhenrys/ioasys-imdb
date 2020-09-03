const filmRepository = require('../../repositories/FilmRepository')
const genreService = require('../genre')
const personService = require('../person')

module.exports = async film => {
  const genres = await genreService.findMany(film.genres)
  const participations = await personService.findMany(film.persons)
  const filmSave = await filmRepository.create(film)

  await filmSave.setGenres(genres)

  for (const { person: { id: personId }, role } of participations) {
    await filmSave.createParticipation({ personId, role })
  }

  return filmRepository.findById(filmSave.id)
}
