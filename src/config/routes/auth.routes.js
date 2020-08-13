const { Router } = require('express')
const { AuthController } = require('../../app/controllers/api/v1')

const routes = Router()

routes.post('/signin', AuthController.signin)
routes.post('/signup', AuthController.signup)

module.exports = routes
