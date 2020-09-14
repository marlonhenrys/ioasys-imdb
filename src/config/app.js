const express = require('express')
const morgan = require('morgan')
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express')
const swaggerConfig = require('./swagger')
const path = require('path')

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

require('../database')
require('./indicative')

const app = express()

app.use(morgan('combined'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'images')))
app.use('/api/v1', routes)

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

module.exports = app
