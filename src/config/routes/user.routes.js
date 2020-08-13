const { Router } = require('express')
const { UserController } = require('../../app/controllers/api/v1')
const { auth, access } = require('../../app/middlewares')

const routes = Router()

routes.post('/users', auth, access, UserController.create)
routes.get('/users', auth, access, UserController.index)
routes.get('/users/:id', auth, access, UserController.show)

module.exports = routes
