const userRepository = require('../../repositories/UserRepository')

module.exports = (page = 1, limit = 10, filters) => {
  const offset = (page - 1) * limit
  const conditions = { user: { } }

  if (filters.role) {
    conditions.user.role = filters.role
  }

  return userRepository.findAll({ offset, limit }, conditions)
}
