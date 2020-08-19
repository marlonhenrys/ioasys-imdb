const { Genre } = require('../models')

module.exports = {

  findOrCreate: name => Genre.findOrCreate({ where: { name } }),

  findById: id => Genre.findByPk(id),

  findAll: () => Genre.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

}
