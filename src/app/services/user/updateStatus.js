const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')
const { role } = require('../../utils/enumUser')

module.exports = async (users, status, auth) => {
  try {
    if (auth.role === role.ADM) {
      for (const id of users) {
        const user = await userRepository.findById(id)

        if (!user) {
          throw new ApplicationError(`Usuário de ID ${id} não encontrado`, 404)
        }

        user.status = status
        await user.save()
      }
    } else if (users.length === 1 && auth.id === users[0]) {
      const user = await userRepository.findById(auth.id)

      if (!user) {
        throw new ApplicationError('Usuário não encontrado', 404)
      }

      user.status = status
      await user.save()
    } else {
      throw new ApplicationError('Você não tem permissão para editar este registro', 403)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
