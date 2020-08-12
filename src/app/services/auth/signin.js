require('dotenv').config()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')
const { status } = require('../../utils/enumUser')

module.exports = async (email, password) => {
  try {
    const user = await userRepository.findByEmail(email)

    if (!user) {
      throw new ApplicationError('Usuário não encontrado', 404)
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      throw new ApplicationError('Senha incorreta', 401)
    } else if (user.status === status.INT) {
      throw new ApplicationError('Este usuário está desabilitado', 403)
    } else if (user.status === status.DIS) {
      throw new ApplicationError('Este usuário foi desabilitado por um administrador', 403)
    } else if (user.status === status.DEL) {
      throw new ApplicationError('Este usuário foi excluído', 403)
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
  } catch (error) {
    console.error(error)
    throw error
  }
}
