const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

module.exports = async userId => {
  const user = await userRepository.findById(userId)

  if (!user) {
    throw new ApplicationError('Usuário não encontrado', HttpStatus.NOT_FOUND)
  }

  return user
}
