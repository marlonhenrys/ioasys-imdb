const { filmService } = require('../../../services')
const HttpStatus = require('http-status-codes')

module.exports = {

  graph: async (req, res) => {
    try {
      const result = await filmService.graph()

      if (result.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).send()
      }

      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  },

  ranking: async (req, res) => {
    try {
      const { size } = req.query

      const result = await filmService.ranking(size)

      if (result.length === 0) {
        return res.status(HttpStatus.NO_CONTENT).send()
      }

      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  }
}
