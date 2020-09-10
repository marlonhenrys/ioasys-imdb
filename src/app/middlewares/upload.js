const path = require('path')
const multer = require('multer')
const { filmService } = require('../services')
const ApplicationError = require('../utils/errorHandler')
const HttpStatus = require('http-status-codes')

const options = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'images'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'images'))
    },
    filename: async (req, file, cb) => {
      try {
        const film = await filmService.findOne(req.params.id)

        const fileName = `film_cover_${film.id}${path.extname(file.originalname)}`

        cb(null, fileName)
      } catch (error) {
        console.error(error)
        cb(error)
      }
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new ApplicationError('Tipo de arquivo inválido', HttpStatus.UNPROCESSABLE_ENTITY))
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}

const upload = multer(options).single('file')

module.exports = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      console.error(error)

      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
    return next()
  })
}
