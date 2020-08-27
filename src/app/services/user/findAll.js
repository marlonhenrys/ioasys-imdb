const userRepository = require('../../repositories/UserRepository')
const { Op } = require('sequelize')

module.exports = (page = 1, limit = 10, filters) => {
  const offset = (page - 1) * limit
  const conditions = { user: {} }

  if (filters.name) {
    conditions.user.name = {
      [Op.iLike]: '%' + filters.name + '%'
    }
  }
  if (filters.role) {
    conditions.user.role = filters.role
  }

  return userRepository.findAll({ offset, limit }, conditions)
}
