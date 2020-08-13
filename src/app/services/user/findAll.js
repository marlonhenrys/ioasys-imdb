const userRepository = require('../../repositories/UserRepository')

module.exports = async role => {
  try {
    const users = role
      ? await userRepository.findAllByRole(role)
      : await userRepository.findAll()

    if (!users) {
      throw new Error('Não foi possível carregar a lista de usuários')
    }

    return users
  } catch (error) {
    console.error(error)
    throw error
  }
}
