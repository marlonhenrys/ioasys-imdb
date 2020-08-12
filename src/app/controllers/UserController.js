const { userService } = require('../services')
const validator = require('indicative/validator')
const { user: errorMessages } = require('../utils/errorMessages')

module.exports = {

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
  }
}
