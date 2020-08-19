const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const { User, Film, Genre } = require('../app/models')

const connection = new Sequelize(dbConfig)

User.init(connection)
Film.init(connection)
Genre.init(connection)

Film.associate(connection.models)
Genre.associate(connection.models)

module.exports = connection
