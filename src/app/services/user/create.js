const userRepository = require('../../repositories/UserRepository')
const bcrypt = require('bcrypt')

module.exports = async user => {
  try {
    user.password = await bcrypt.hash(user.password, 10)
    const created = await userRepository.create(user)

    if (!created) {
      throw new Error('Não foi possível criar o usuário')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
