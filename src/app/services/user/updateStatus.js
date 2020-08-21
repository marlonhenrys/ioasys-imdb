const userRepository = require('../../repositories/UserRepository')
const ApplicationError = require('../../utils/errorHandler')
const { role, status } = require('../../utils/enumUser')
const HttpStatus = require('http-status-codes')

module.exports = async (users, newStatus, auth) => {
  if (users && users.length && auth.role === role.ADM) {
    for (const id of users) {
      if (auth.id === id && newStatus === status.DIS) {
        throw new ApplicationError('Não é possível alterar o próprio status para ' + newStatus,
          HttpStatus.FORBIDDEN)
      } else if (auth.id !== id && newStatus === status.INT) {
        throw new ApplicationError('Não é possível alterar o status de outro usuário para ' + newStatus,
          HttpStatus.FORBIDDEN)
      }

      const user = await userRepository.findById(id)

      if (!user) {
        throw new ApplicationError(`Usuário de ID ${id} não encontrado`, HttpStatus.NOT_FOUND)
      }

      user.status = newStatus
      await user.save()
    }
  } else if (newStatus === status.ATV || newStatus === status.INT) {
    const user = await userRepository.findById(auth.id)

    if (!user) {
      throw new ApplicationError('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }

    user.status = newStatus
    await user.save()
  } else {
    throw new ApplicationError('Você não tem permissão realizar esta operação', HttpStatus.FORBIDDEN)
  }
}
