const filmRepository = require('../../repositories/FilmRepository')
const userService = require('../user')
const findOne = require('./findOne')

module.exports = async ({ filmId, userId, value }) => {
  const film = await findOne(filmId)
  const user = await userService.findOne(userId)

  await film.addVote(user, { through: { value } })

  const result = await filmRepository.averageRating(film.id)

  film.avgRating = parseFloat(result.getDataValue('avgRating')).toFixed(1)

  await film.save()
}
