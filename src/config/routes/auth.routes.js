const { Router } = require('express')
const { AuthController } = require('../../app/controllers')

const routes = Router()

routes.post('/signin', AuthController.signin)

module.exports = routes
