const { Genre } = require('../models')

module.exports = {

  findById: id => Genre.findByPk(id),

  findAll: () => Genre.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  })

}
