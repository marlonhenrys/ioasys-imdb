const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')
const { role, status } = require('../../utils/enumUser')

module.exports = async (userId, auth) => {
  if (auth.role === role.ADM || auth.id === userId) {
    const user = await userRepository.findById(userId)

    user.status = status.DEL
    await user.save()
  } else {
    throw new ApplicationError('Você não tem permissão para excluir este registro', 403)
  }
}
