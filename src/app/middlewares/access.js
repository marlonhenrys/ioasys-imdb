const ApplicationError = require('../utils/errorHandler')
const { role } = require('../utils/enumUser')

module.exports = async (req, res, next) => {
  try {
    const action = req.method + ' ' + req.path
    const userRole = req.auth.role
    const { id } = req.params

    let permission = false

    switch (action) {
      case 'POST /users':
        permission = userRole === role.ADM
        break
      case 'GET /users':
        permission = userRole === role.ADM
        break
      case `GET /users/${id}`:
        permission = userRole === role.ADM
        break
      case `PUT /users/${id}`:
        permission = true
        break
      case 'PATCH /users':
        permission = true
        break
      case `DELETE /users/${id}`:
        permission = true
        break
      default:
        permission = false
        break
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
