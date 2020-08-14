const { userService } = require('../../../services')
const validator = require('indicative/validator')
const { user: errorMessages } = require('../../../utils/errorMessages')

module.exports = {

  index: async (req, res) => {
    try {
      const { role } = req.query
      const users = await userService.findAll(role)

      return res.status(200).json(users)
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
        name: 'required|string|min:3',
        password: 'required|string|min:6',
        role: 'required|string|in:Admin,Member',
        username: 'required|string|unique:User|min:3|max:30',
        email: 'required|email|unique:User'
      }, errorMessages)

      const user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        email: req.body.email
      }

      await userService.create(user)

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
      const user = await userService.findOne(id)

      return res.status(200).json(user)
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
        name: 'string|min:3',
        username: 'string|unique:User|min:3|max:30',
        email: 'email|unique:User'
      }, errorMessages)

      const data = {
        id: req.params.id,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
      }

      await userService.update(data, req.auth)

      return res.status(204).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  },

  updateStatus: async (req, res) => {
    try {
      await validator.validate(req.body, {
        users: 'required|array',
        status: 'required|string|in:Active,Inactive,Disabled'
      }, errorMessages)

      const { users, status } = req.body

      await userService.updateStatus(users, status, req.auth)

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
      await userService.destroy(id, req.auth)

      return res.status(204).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  }
}
