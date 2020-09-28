const { personService } = require('../../../services')
const validator = require('indicative/validator')
const { person: errorMessages } = require('../../../utils/errorMessages')
const HttpStatus = require('http-status-codes')

module.exports = {

  index: async (req, res) => {
    try {
      const { page, limit, ...filters } = req.query

      const persons = await personService.findAll(page, limit, filters)

      if (!persons.length) {
        return res.status(HttpStatus.NO_CONTENT).send()
      }

      return res.status(HttpStatus.OK).json(persons)
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
        name: 'required|string|min:3',
        biography: 'string'
      }, errorMessages)

      const data = {
        name: req.body.name,
        biography: req.body.biography
      }

      const person = await personService.create(data)

      return res.status(HttpStatus.CREATED).json(person)
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
      const person = await personService.findOne(id)

      return res.status(HttpStatus.OK).json(person)
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
        name: 'string|min:3',
        biography: 'string'
      }, errorMessages)

      const data = {
        id: req.params.id,
        name: req.body.name,
        biography: req.body.biography
      }

      await personService.update(data)

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

      await personService.destroy(id)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  }
}
