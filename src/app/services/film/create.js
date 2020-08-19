const filmRepository = require('../../repositories/FilmRepository')

module.exports = async film => {
  const created = await filmRepository.create(film)

  if (!created) {
    throw new Error('Não foi possível cadastrar o filme')
  }
}
