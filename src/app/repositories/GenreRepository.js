const { Genre } = require('../models')

module.exports = {

  findOrCreate: name => Genre.findOrCreate({ where: { name } }),

  findById: id => Genre.findByPk(id)

}
