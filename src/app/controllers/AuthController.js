const { authService } = require('../services')
const validator = require('indicative/validator')
const { user: errorMessages } = require('../utils/errorMessages')

module.exports = {

  signin: async (req, res) => {
    try {
      await validator.validate(req.body, {
        email: 'required|email',
        password: 'required|string|min:6'
      }, errorMessages)

      const { email, password } = req.body

      const user = await authService.signin(email, password)

      return res.status(200).json(user)
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
        message: error.message
      })
    }
  }
}
