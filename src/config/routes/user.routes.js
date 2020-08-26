const { Router } = require('express')
const { UserController } = require('../../app/controllers/api/v1')
const { auth, isAdmin } = require('../../app/middlewares')

const routes = Router()

routes.get('/users', auth, isAdmin, UserController.index)
routes.post('/users', auth, isAdmin, UserController.create)
routes.get('/users/:id', auth, isAdmin, UserController.show)
routes.put('/users/:id', auth, UserController.update)
routes.patch('/users', auth, UserController.updateStatus)
routes.delete('/users/:id', auth, UserController.destroy)

module.exports = routes
