const { Genre } = require('../models')

module.exports = {

  findById: id => Genre.findByPk(id),

  findAll: (offset, limit, conditions) => Genre.findAll({
    offset,
    limit,
    where: conditions.genre,
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

}
