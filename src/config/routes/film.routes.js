const { Router } = require('express')
const { FilmController } = require('../../app/controllers/api/v1')
const { auth, isAdmin } = require('../../app/middlewares')

const routes = Router()

routes.get('/films', FilmController.index)
routes.post('/films', auth, isAdmin, FilmController.create)
routes.get('/films/:id', FilmController.show)
routes.put('/films/:id', auth, isAdmin, FilmController.update)
routes.delete('/films/:id', auth, isAdmin, FilmController.destroy)

module.exports = routes
