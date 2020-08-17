const { Router } = require('express')

const routes = Router()

routes.use(require('./auth.routes'))
routes.use(require('./user.routes'))

module.exports = routes
