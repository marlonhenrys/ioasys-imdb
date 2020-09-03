const filmRepository = require('../../repositories/FilmRepository')

module.exports = async () => {
  const result = await filmRepository.graph()

  return result.map(marker => {
    marker.setDataValue('amount', parseInt(marker.getDataValue('amount')))
    return marker
  })
}
