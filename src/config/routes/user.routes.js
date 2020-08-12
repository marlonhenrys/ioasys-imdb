const { Router } = require('express')
const { UserController } = require('../../app/controllers')
const { auth, access } = require('../../app/middlewares')

const routes = Router()

routes.post('/users', auth, access, UserController.create)

module.exports = routes
