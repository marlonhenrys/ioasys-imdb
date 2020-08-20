const { genreService } = require('../../../services')

module.exports = {

  index: async (req, res) => {
    try {
      const genres = await genreService.findAll()

      return res.status(200).json(genres)
    } catch (error) {
      console.error(error)

      return res.status(error.status || 500).json({
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
