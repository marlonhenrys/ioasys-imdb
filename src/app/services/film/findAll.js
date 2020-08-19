const filmRepository = require('../../repositories/FilmRepository')

module.exports = async () => {
  const films = await filmRepository.findAll()

  if (!films) {
    throw new Error('Não foi possível carregar a lista de filmes')
  }

  return films
}
