const genreRepository = require('../../repositories/GenreRepository')

module.exports = async data => {
  const genre = await genreRepository.findById(data.id)

  genre.name = data.name
  await genre.save()
}
