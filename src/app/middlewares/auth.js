require('dotenv').config()

const jwt = require('jsonwebtoken')
const userRepository = require('../repositories/UserRepository')
const ApplicationError = require('../utils/errorHandler')
const { status } = require('../utils/enumUser')

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      throw new ApplicationError('Nenhum token fornecido', 401)
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
      throw new ApplicationError('Erro de token', 401)
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      throw new ApplicationError('Token mal formatado', 401)
    }

    await jwt.verify(token, process.env.APP_KEY, async (error, decoded) => {
      if (error) {
        throw new ApplicationError('Token inválido', 401)
      }

      const user = await userRepository.findById(decoded.user_id)

      if (!user) {
        throw new ApplicationError('Não foi possível autenticar o usuário', 401)
      } else if (user.status === status.INT) {
        throw new ApplicationError('Este usuário está desabilitado', 403)
      } else if (user.status === status.DIS) {
        throw new ApplicationError('Este usuário foi desabilitado por um administrador', 403)
      } else if (user.status === status.DEL) {
        throw new ApplicationError('Este usuário foi excluído', 403)
      }

      req.auth = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role
      }

      return next()
    })
  } catch (error) {
    console.error(error)

    return res.status(error.status || 500).json({
      message: error.message
    })
  }
}
