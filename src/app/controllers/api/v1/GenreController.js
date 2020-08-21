const { genreService } = require('../../../services')
const HttpStatus = require('http-status-codes')

module.exports = {

  index: async (req, res) => {
    try {
      const { page, limit, ...filters } = req.query

      const genres = await genreService.findAll(page, limit, filters)

      return res.status(HttpStatus.OK).json(genres)
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  create: async (req, res) => {

  },

  show: async (req, res) => {

  },

  update: async (req, res) => {

  },

  destroy: async (req, res) => {

  }
}
