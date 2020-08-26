const ApplicationError = require('../utils/errorHandler')
const HttpStatus = require('http-status-codes')
const { role } = require('../utils/enumUser')

module.exports = async (req, res, next) => {
  try {
    if (req.auth.role !== role.ADM) {
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
