const userRepository = require('../../repositories/UserRepository')
const bcrypt = require('bcrypt')

module.exports = async user => {
  user.email = user.email.toLowerCase()
  user.username = user.username.toLowerCase()
  user.password = await bcrypt.hash(user.password, 10)

  await userRepository.create(user)
}
