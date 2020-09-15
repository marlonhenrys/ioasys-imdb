const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')
const { role } = require('../../utils/enumUser')

module.exports = async (data, auth) => {
  if (auth.role === role.ADM || auth.id === parseInt(data.id)) {
    const user = await userRepository.findById(data.id)

    if (!user) {
      throw new ApplicationError('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }

    if (data.name) { user.name = data.name }
    if (data.username) { user.username = data.username.toLowerCase() }
    if (data.email) { user.email = data.email.toLowerCase() }

    await user.save()
  } else {
    throw new ApplicationError('Você não tem permissão para editar este registro', HttpStatus.FORBIDDEN)
  }
}
