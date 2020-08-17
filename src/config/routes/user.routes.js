const { Router } = require('express')
const { UserController } = require('../../app/controllers/api/v1')
const { auth, access } = require('../../app/middlewares')

const routes = Router()

routes.get('/users', auth, access, UserController.index)
routes.post('/users', auth, access, UserController.create)
routes.get('/users/:id', auth, access, UserController.show)
routes.put('/users/:id', auth, access, UserController.update)
routes.patch('/users', auth, access, UserController.updateStatus)
routes.delete('/users/:id', auth, access, UserController.destroy)

module.exports = routes
