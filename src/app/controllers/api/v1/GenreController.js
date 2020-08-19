const { filmService, genreService } = require('../../../services')
const validator = require('indicative/validator')
const { genre: errorMessages } = require('../../../utils/errorMessages')

module.exports = {

  index: async (req, res) => {
    try {
      const genres = await genreService.findAll()

      return res.status(200).json(genres)
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  },

  create: async (req, res) => {
    try {
      await validator.validate(req.body, {
        name: 'required|string'
      }, errorMessages)

      const { filmId } = req.params
      const genreName = req.body.name

      await filmService.addGenre(filmId, genreName)

      return res.status(204).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  },

  destroy: async (req, res) => {
    try {
      const { filmId, genreId } = req.params

      await filmService.removeGenre(filmId, genreId)

      return res.status(204).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  }
}
