const genreRepository = require('../../repositories/GenreRepository')

module.exports = async () => {
  const genres = await genreRepository.findAll()

  if (!genres) {
    throw new Error('Não foi possível carregar a lista de gêneros')
  }

  return genres
}
