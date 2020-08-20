const genreRepository = require('../../repositories/GenreRepository')

module.exports = () => {
  return genreRepository.findAll()
}
