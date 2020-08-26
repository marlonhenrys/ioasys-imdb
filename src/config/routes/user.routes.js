const { Router } = require('express')
const { UserController } = require('../../app/controllers/api/v1')
const { auth, isAdmin } = require('../../app/middlewares')

const routes = Router()

routes.use(auth)

routes.get('/users', isAdmin, UserController.index)
routes.post('/users', isAdmin, UserController.create)
routes.get('/users/:id', isAdmin, UserController.show)
routes.put('/users/:id', UserController.update)
routes.patch('/users', UserController.updateStatus)
routes.delete('/users/:id', UserController.destroy)

module.exports = routes
