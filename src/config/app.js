const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express')
const swaggerConfig = require('./swagger')

require('../database')
require('./indicative')

const app = express()

app.use(morgan('combined'))

app.use(express.json())
app.use(routes)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

module.exports = app
