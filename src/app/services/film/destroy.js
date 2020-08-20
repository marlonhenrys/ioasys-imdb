const filmRepository = require('../../repositories/FilmRepository')

module.exports = async filmId => {
  const film = await filmRepository.findById(filmId)

  await film.destroy()
}
