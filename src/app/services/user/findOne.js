const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')

module.exports = async userId => {
  const user = await userRepository.findById(userId)

  if (!user) {
    throw new ApplicationError('Usuário não encontrado', 404)
  }

  return user
}
