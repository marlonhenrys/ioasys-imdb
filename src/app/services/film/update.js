const filmRepository = require('../../repositories/FilmRepository')

module.exports = async data => {
  const film = await filmRepository.findById(data.id)

  if (data.name) { film.name = data.name }
  if (data.synopsis) { film.synopsis = data.synopsis }
  if (data.duration) { film.duration = data.duration }
  if (data.language) { film.language = data.language }
  if (data.release) { film.release = data.release }

  await film.save()
}
