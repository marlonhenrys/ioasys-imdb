const { Router } = require('express')
const { PersonController } = require('../../app/controllers/api/v1')
const { auth, access } = require('../../app/middlewares')

const routes = Router()

routes.get('/persons', auth, access, PersonController.index)
routes.post('/persons', auth, access, PersonController.create)
routes.get('/persons/:id', auth, access, PersonController.show)
routes.put('/persons/:id', auth, access, PersonController.update)
routes.delete('/persons/:id', auth, access, PersonController.destroy)

module.exports = routes
