const { Router } = require('express')
const { PersonController } = require('../../app/controllers/api/v1')
const { auth, isAdmin } = require('../../app/middlewares')

const routes = Router()

routes.get('/persons', PersonController.index)
routes.post('/persons', auth, isAdmin, PersonController.create)
routes.get('/persons/:id', PersonController.show)
routes.put('/persons/:id', auth, isAdmin, PersonController.update)
routes.delete('/persons/:id', auth, isAdmin, PersonController.destroy)

module.exports = routes
