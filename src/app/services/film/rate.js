const filmRepository = require('../../repositories/FilmRepository')

module.exports = async ({ filmId, userId, value }) => {
  const { userService, filmService } = require('../../services')

  const film = await filmService.findOne(filmId)
  const user = await userService.findOne(userId)

  await film.addVote(user, { through: { value } })

  const result = await filmRepository.averageRating(film.id)

  film.avg_rating = result.getDataValue('avg_rating')

  await film.save()
}
