const { Router } = require('express')

const routes = Router()

routes.use(require('./auth.routes'))
routes.use(require('./user.routes'))
routes.use(require('./film.routes'))
routes.use(require('./genre.routes'))

module.exports = routes
