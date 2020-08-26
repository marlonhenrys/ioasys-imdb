const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')
const userAcess = require('./user')
const filmAcess = require('./film')
const genreAcess = require('./genre')
const personAcess = require('./person')

module.exports = async (req, res, next) => {
  try {
    const action = req.method + ' ' + req.path
    const currentRole = req.auth.role

    let permission = false

    if (req.path.startsWith('/users')) {
      permission = userAcess(action, req.params, currentRole)
    } else if (req.path.startsWith('/films')) {
      permission = filmAcess(action, req.params, currentRole)
    } else if (req.path.startsWith('/genres')) {
      permission = genreAcess(action, req.params, currentRole)
    } else if (req.path.startsWith('/persons')) {
      permission = personAcess(action, req.params, currentRole)
   

    if (!permission) {
      throw new ApplicationError('Você não tem permissão para acessar este recurso',
        HttpStatus.FORBIDDEN)
    }

    return next()
  } catch (error) {
    console.error(error)

    return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message
    })
  }
}
