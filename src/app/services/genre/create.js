const genreRepository = require('../../repositories/GenreRepository')

module.exports = genre => genreRepository.create(genre)
