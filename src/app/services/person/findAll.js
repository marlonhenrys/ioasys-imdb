const personRepository = require('../../repositories/PersonRepository')
const { Op } = require('sequelize')

module.exports = (page = 1, limit = 10, filters) => {
  const offset = (page - 1) * limit
  const conditions = { person: { } }

  if (filters.name) {
    conditions.person.name = {
      [Op.iLike]: '%' + filters.name + '%'
    }
  }

  return personRepository.findAll({ offset, limit }, conditions)
}
