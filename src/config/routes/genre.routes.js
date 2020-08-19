const { Router } = require('express')
const { GenreController } = require('../../app/controllers/api/v1')
const { auth, access } = require('../../app/middlewares')

const routes = Router()

routes.post('/films/:filmId/genres', auth, access, GenreController.create)
routes.delete('/films/:filmId/genres/:genreId', auth, access, GenreController.destroy)

module.exports = routes
