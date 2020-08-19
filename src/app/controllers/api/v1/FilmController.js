const { filmService } = require('../../../services')
const validator = require('indicative/validator')
const { film: errorMessages } = require('../../../utils/errorMessages')

module.exports = {

  index: async (req, res) => {
    try {
      const films = await filmService.findAll()

      return res.status(200).json(films)
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
        name: 'required|string',
        synopsis: 'required|string',
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
        duration: req.body.duration,
        language: req.body.language,
        release: req.body.release
      }

      await filmService.create(film)

      return res.status(204).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params
      const film = await filmService.findOne(id)

      return res.status(200).json(film)
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  },

  update: async (req, res) => {
    try {
      await validator.validate(req.body, {
        name: 'required|string',
        synopsis: 'required|string',
        language: 'required|string',
        release: 'required|date',
        duration: [
          validator.validations.required(),
          validator.validations.string(),
          validator.validations.regex([/^\d{1,2}[:][0-5][0-9]$/])
        ]
      }, errorMessages)

      const data = {
        id: req.params.id,
        name: req.body.name,
        synopsis: req.body.synopsis,
        duration: req.body.duration,
        language: req.body.language,
        release: req.body.release
      }

      await filmService.update(data)

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
      const { id } = req.params
      await filmService.destroy(id)

      return res.status(204).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  }
}
