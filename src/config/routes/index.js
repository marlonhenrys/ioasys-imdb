const { Router } = require('express')

const routes = Router()

routes.use(require('./auth.routes'))

module.exports = routes
