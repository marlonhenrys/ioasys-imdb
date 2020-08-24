const { Genre } = require('../models')

module.exports = {

  create: genre => Genre.create(genre),

  findById: id => Genre.findByPk(id),

  findAll: (options, conditions) => Genre.findAll({
    options,
    where: conditions.genre,
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

}
