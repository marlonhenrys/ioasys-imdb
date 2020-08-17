const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')
const { role, status } = require('../../utils/enumUser')

module.exports = async (users, newStatus, auth) => {
  if (users && users.length && auth.role === role.ADM) {
    for (const id of users) {
      if (auth.id === id && newStatus === status.DIS) {
        throw new ApplicationError('Não é possível alterar o próprio status para ' + newStatus, 403)
      } else if (auth.id !== id && newStatus === status.INT) {
        throw new ApplicationError('Não é possível alterar o status de outro usuário para ' + newStatus, 403)
      }

      const user = await userRepository.findById(id)

      if (!user) {
        throw new ApplicationError(`Usuário de ID ${id} não encontrado`, 404)
      }

      user.status = newStatus
      await user.save()
    }
  } else if (newStatus === status.ATV || newStatus === status.INT) {
    const user = await userRepository.findById(auth.id)

    if (!user) {
      throw new ApplicationError('Usuário não encontrado', 404)
    }

    user.status = newStatus
    await user.save()
  } else {
    throw new ApplicationError('Você não tem permissão realizar esta operação', 403)
  }
}
