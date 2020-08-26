const { Person } = require('../models')

module.exports = {

  create: person => Person.create(person),

  findById: id => Person.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  }),

  findAll: (options, conditions) => Person.findAll({
    options,
    where: conditions.person,
    attributes: {
      exclude: ['biography', 'createdAt', 'updatedAt']
    }
  })

}
