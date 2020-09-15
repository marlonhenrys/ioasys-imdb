const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')
const { role, status } = require('../../utils/enumUser')

module.exports = async (userId, auth) => {
  if (auth.role === role.ADM || auth.id === parseInt(userId)) {
    const user = await userRepository.findById(userId)

    if (!user) {
      throw new ApplicationError('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }

    user.status = status.DEL
    await user.save()
  } else {
    throw new ApplicationError('Você não tem permissão para excluir este registro', HttpStatus.FORBIDDEN)
  }
}
