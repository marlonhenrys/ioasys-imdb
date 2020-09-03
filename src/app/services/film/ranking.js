const filmRepository = require('../../repositories/FilmRepository')

module.exports = (size = 10) => filmRepository.ranking(size)
