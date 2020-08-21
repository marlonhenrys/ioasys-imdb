const { Genre } = require('../models')

module.exports = {

  findById: id => Genre.findByPk(id),

  findAll: (options, conditions) => Genre.findAll({
    options,
    where: conditions.genre,
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

}
