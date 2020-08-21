const { filmService } = require('../../../services')
const validator = require('indicative/validator')
const { film: errorMessages } = require('../../../utils/errorMessages')
const HttpStatus = require('http-status-codes')

module.exports = {

  index: async (req, res) => {
    try {
      const { page, limit, ...filters } = req.query

      const films = await filmService.findAll(page, limit, filters)

      return res.status(HttpStatus.OK).json(films)
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
        name: 'required|string',
        synopsis: 'required|string',
        genres: 'required|array|min:1',
        language: 'required|string',
        release: 'required|date',
        duration: [
          validator.validations.required(),
          validator.validations.string(),
          validator.validations.regex([/^\d{1,2}[:][0-5][0-9]$/])
        ]
      }, errorMessages)

      const film = {
        name: req.body.name,
        synopsis: req.body.synopsis,
        genres: req.body.genres,
        duration: req.body.duration,
        language: req.body.language,
        release: req.body.release
      }

      await filmService.create(film)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params
      const film = await filmService.findOne(id)

      return res.status(HttpStatus.OK).json(film)
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  update: async (req, res) => {
    try {
      await validator.validate(req.body, {
        name: 'string',
        synopsis: 'string',
        genres: 'array|min:1',
        language: 'string',
        release: 'date',
        duration: [
          validator.validations.string(),
          validator.validations.regex([/^\d{1,2}[:][0-5][0-9]$/])
        ]
      }, errorMessages)

      const data = {
        id: req.params.id,
        name: req.body.name,
        synopsis: req.body.synopsis,
        genres: req.body.genres,
        duration: req.body.duration,
        language: req.body.language,
        release: req.body.release
      }

      await filmService.update(data)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params
      await filmService.destroy(id)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  }
}
