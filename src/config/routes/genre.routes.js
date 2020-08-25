const { Router } = require('express')
const { GenreController } = require('../../app/controllers/api/v1')
const { auth, access } = require('../../app/middlewares')

const routes = Router()

routes.get('/genres', auth, access, GenreController.index)
routes.post('/genres', auth, access, GenreController.create)
routes.put('/genres/:id', auth, access, GenreController.update)
routes.delete('/genres/:id', auth, access, GenreController.destroy)

module.exports = routes
