'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'System Admin',
      username: 'sysadmin',
      email: 'admin@system.com.br',
      password: await bcrypt.hash('admin:p@ss', 10),
      role: 'Admin',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
