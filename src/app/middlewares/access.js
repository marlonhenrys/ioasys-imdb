const ApplicationError = require('../utils/errorHandler')
// const { role } = require('../utils/enumUser')

module.exports = async (req, res, next) => {
  try {
    const action = req.method + ' ' + req.path
    // const userType = req.auth.type
    // const { id } = req.params

    let permission = false

    switch (action) {
    //   case 'POST /users':
    //     permission = true
    //     break
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
