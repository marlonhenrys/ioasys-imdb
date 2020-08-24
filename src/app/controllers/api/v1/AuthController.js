const { authService, userService } = require('../../../services')
const validator = require('indicative/validator')
const { user: errorMessages } = require('../../../utils/errorMessages')
const HttpStatus = require('http-status-codes')

module.exports = {

  signup: async (req, res) => {
    try {
      await validator.validate(req.body, {
        name: 'required|string|min:3',
        password: 'required|string|min:6',
        username: 'required|string|alpha_numeric|unique:User|min:3|max:30',
        email: 'required|email|unique:User'
      }, errorMessages)

      const user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      }

      await userService.create(user)

      return res.status(HttpStatus.NO_CONTENT).send()
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  signin: async (req, res) => {
    try {
      await validator.validate(req.body, {
        email: 'required|email',
        password: 'required|string|min:6'
      }, errorMessages)

      const { email, password } = req.body

      const user = await authService.signin(email, password)

      return res.status(HttpStatus.OK).json(user)
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  }
}
