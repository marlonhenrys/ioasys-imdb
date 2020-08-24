require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')
const { status } = require('../../utils/enumUser')

module.exports = async (email, password) => {
  const user = await userRepository.findByEmail(email.toLowerCase())

  if (!user) {
    throw new ApplicationError('Usuário não encontrado', HttpStatus.NOT_FOUND)
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    throw new ApplicationError('Senha incorreta', HttpStatus.UNAUTHORIZED)
  } else if (user.status === status.INT) {
    throw new ApplicationError('Este usuário está desabilitado', HttpStatus.FORBIDDEN)
  } else if (user.status === status.DIS) {
    throw new ApplicationError('Este usuário foi desabilitado por um administrador', HttpStatus.FORBIDDEN)
  } else if (user.status === status.DEL) {
    throw new ApplicationError('Este usuário foi excluído', HttpStatus.FORBIDDEN)
  }

  const token = jwt.sign({ user_id: user.id }, process.env.APP_KEY, {
    expiresIn: 86400
  })

  const response = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    token
  }

  return response
}
