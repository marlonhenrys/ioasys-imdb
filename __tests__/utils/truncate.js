const { Film } = require('../../src/app/models')

module.exports = {
  films: () => Film.destroy({ truncate: true, force: true, cascade: true })
}
