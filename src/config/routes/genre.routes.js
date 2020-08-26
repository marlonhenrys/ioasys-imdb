const { Router } = require('express')
const { GenreController } = require('../../app/controllers/api/v1')
const { auth, isAdmin } = require('../../app/middlewares')

const routes = Router()

routes.get('/genres', GenreController.index)
routes.post('/genres', auth, isAdmin, GenreController.create)
routes.put('/genres/:id', auth, isAdmin, GenreController.update)
routes.delete('/genres/:id', auth, isAdmin, GenreController.destroy)

module.exports = routes
