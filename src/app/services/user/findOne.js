const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')

module.exports = async id => {
  const user = await userRepository.findById(id)

  if (!user) {
    throw new ApplicationError('Usuário não encontrado', 404)
  }

  return user
}
