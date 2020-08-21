const userRepository = require('../../repositories/UserRepository')

module.exports = (page, limit, filters) => {
  const offset = (page - 1) * limit
  const conditions = { user: {} }

  if (filters.role) { conditions.user.role = filters.role }

  return userRepository.findAll(offset, limit, conditions)
}
