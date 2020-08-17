const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const { User, Film } = require('../app/models')

const connection = new Sequelize(dbConfig)

User.init(connection)
Film.init(connection)

module.exports = connection
