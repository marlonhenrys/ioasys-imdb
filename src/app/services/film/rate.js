const { userService, filmService } = require('../../services')
const filmRepository = require('../../repositories/FilmRepository')

module.exports = async ({ filmId, userId, value }) => {
  const film = await filmService.findOne(filmId)
  const user = await userService.findOne(userId)

  await film.addVote(user, { through: { value } })

  const avgRating = await filmRepository.findByIdWithAvgRating(film.getDataValue('id'))

  film.average_ratings = avgRating.getDataValue('avg_rating')
  await film.save()
}
