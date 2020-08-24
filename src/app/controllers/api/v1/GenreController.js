const { genreService } = require('../../../services')
const validator = require('indicative/validator')
const { genre: errorMessages } = require('../../../utils/errorMessages')
const HttpStatus = require('http-status-codes')

module.exports = {

  index: async (req, res) => {
    try {
      const { page, limit, ...filters } = req.query

      const genres = await genreService.findAll(page, limit, filters)

      return res.status(HttpStatus.OK).json(genres)
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  create: async (req, res) => {
    try {
      await validator.validate(req.body, {
        name: 'required|string'
      }, errorMessages)

      const genre = {
        name: req.body.name
      }

      await genreService.create(genre)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  show: async (req, res) => {

  },

  update: async (req, res) => {
    try {
      await validator.validate(req.body, {
        name: 'required|string'
      }, errorMessages)

      const data = {
        id: req.params.id,
        name: req.body.name
      }

      await genreService.update(data)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  destroy: async (req, res) => {

  }
}
