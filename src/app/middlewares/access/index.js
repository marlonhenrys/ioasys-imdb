const ApplicationError = require('../../utils/errorHandler')
const userAcess = require('./user')
const filmAcess = require('./film')

module.exports = async (req, res, next) => {
  try {
    const action = req.method + ' ' + req.path
    const currentRole = req.auth.role

    let permission = false

    if (req.path.startsWith('/users')) {
      permission = userAcess(action, req.params, currentRole)
    } else if (req.path.startsWith('/films')) {
      permission = filmAcess(action, req.params, currentRole)
    }

    if (!permission) {
      throw new ApplicationError('Você não tem permissão para acessar este recurso', 403)
    }

    return next()
  } catch (error) {
    console.error(error)

    return res.status(error.status || 500).json({
      message: error.message
    })
  }
}
