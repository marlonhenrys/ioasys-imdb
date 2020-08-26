const filmRepository = require('../../repositories/FilmRepository')
const { genreService, personService } = require('../../services')

module.exports = async film => {
  const genres = await genreService.findMany(film.genres)
  const participations = await personService.findMany(film.persons)
  const filmSave = await filmRepository.create(film)

  for (const genre of genres) {
    await filmSave.addGenre(genre)
  }

  for (const { person, role } of participations) {
    await filmSave.addPerson(person, { through: { role } })
  }

  return filmRepository.findById(filmSave.getDataValue('id'))
}
