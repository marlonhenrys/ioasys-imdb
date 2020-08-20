const filmRepository = require('../../repositories/FilmRepository')
const { genreService } = require('../../services')

module.exports = async film => {
  const genres = await genreService.findMany(film.genres)
  const filmSave = await filmRepository.create(film)

  for (const genre of genres) {
    await filmSave.addGenre(genre)
  }
}
