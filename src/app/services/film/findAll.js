const filmRepository = require('../../repositories/FilmRepository')

module.exports = () => {
  return filmRepository.findAll()
}
