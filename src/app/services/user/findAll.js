const userRepository = require('../../repositories/UserRepository')

module.exports = role => {
  return role ? userRepository.findAllByRole(role) : userRepository.findAll()
}
