const { filmService } = require('../../../services')
const validator = require('indicative/validator')
const { film: errorMessages } = require('../../../utils/errorMessages')
const HttpStatus = require('http-status-codes')

module.exports = {

  index: async (req, res) => {
    try {
      const { page, limit, ...filters } = req.query

      const films = await filmService.findAll(page, limit, filters)

      if (!films.length) {
        return res.status(HttpStatus.NO_CONTENT).send()
      }

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
        'genres.*': 'integer',
        persons: 'required|array|min:1',
        'persons.*': 'object',
        'persons.*.id': 'required|integer',
        'persons.*.role': 'required|string|in:Diretor,Produtor,Roteirista,Ator',
        language: 'required|string',
        release: 'required|date',
        duration: [
          validator.validations.required(),
          validator.validations.string(),
          validator.validations.regex([/^\d{1,2}[:][0-5][0-9]$/])
        ]
      }, errorMessages)

      const data = {
        name: req.body.name,
        synopsis: req.body.synopsis,
        genres: req.body.genres,
        persons: req.body.persons,
        duration: req.body.duration,
        language: req.body.language,
        release: req.body.release
      }

      const film = await filmService.create(data)

      return res.status(HttpStatus.CREATED).json(film)
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
        'genres.*': 'integer',
        persons: 'array|min:1',
        'persons.*': 'object',
        'persons.*.id': 'required|integer',
        'persons.*.role': 'required|string|in:Diretor,Produtor,Roteirista,Ator',
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
        persons: req.body.persons,
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
  },

  rate: async (req, res) => {
    try {
      await validator.validate(req.body, {
        value: 'required|number|under:5'
      }, errorMessages)

      const data = {
        filmId: req.params.id,
        userId: req.auth.id,
        value: req.body.value
      }

      await filmService.rate(data)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  cover: async (req, res) => {
    try {
      const data = {
        id: req.params.id,
        fileName: req.file.filename
      }

      await filmService.update(data)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  }
}
