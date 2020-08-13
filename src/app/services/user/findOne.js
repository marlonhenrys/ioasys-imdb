const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')

module.exports = async id => {
  try {
    const user = await userRepository.findById(id)

    if (!user) {
      throw new ApplicationError('Usuário não encontrado', 404)
    }

    return user
  } catch (error) {
    console.error(error)
    throw error
  }
}
