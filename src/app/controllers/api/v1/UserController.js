const { userService } = require('../../../services')
const validator = require('indicative/validator')
const { user: errorMessages } = require('../../../utils/errorMessages')
const HttpStatus = require('http-status-codes')

module.exports = {

  index: async (req, res) => {
    try {
      const { page, limit, ...filters } = req.query

      const users = await userService.findAll(page, limit, filters)

      if (!users.length) {
        return res.status(HttpStatus.NO_CONTENT).send()
      }

      return res.status(HttpStatus.OK).json(users)
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
        password: 'required|string|min:6',
        role: 'required|string|in:Admin,Member',
        username: 'required|string|alpha_numeric|unique:User|min:3|max:30',
        email: 'required|email|unique:User'
      }, errorMessages)

      const data = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email
      }

      const user = await userService.create(data)

      return res.status(HttpStatus.CREATED).json(user)
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
      const user = await userService.findOne(id)

      return res.status(HttpStatus.OK).json(user)
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
        username: 'string|alpha_numeric|unique:User|min:3|max:30',
        email: 'email|unique:User'
      }, errorMessages)

      const data = {
        id: req.params.id,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
      }

      await userService.update(data, req.auth)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  updateStatus: async (req, res) => {
    try {
      await validator.validate(req.body, {
        users: 'array',
        status: 'required|string|in:Active,Inactive,Disabled'
      }, errorMessages)

      const { users, status } = req.body

      await userService.updateStatus(users, status, req.auth)

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
      await userService.destroy(id, req.auth)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  }
}
