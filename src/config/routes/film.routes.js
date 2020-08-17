const { Router } = require('express')
const { FilmController } = require('../../app/controllers/api/v1')
const { auth, access } = require('../../app/middlewares')

const routes = Router()

routes.get('/films', auth, access, FilmController.index)
routes.post('/films', auth, access, FilmController.create)
routes.get('/films/:id', auth, access, FilmController.show)
routes.put('/films/:id', auth, access, FilmController.update)
routes.delete('/films/:id', auth, access, FilmController.destroy)

module.exports = routes
