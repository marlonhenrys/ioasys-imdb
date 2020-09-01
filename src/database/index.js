const Sequelize = require('sequelize')
const dbConfig = require('../config/database')
const { User, Film, Genre, Person, Participation } = require('../app/models')

const connection = new Sequelize(dbConfig)

User.init(connection)
Film.init(connection)
Genre.init(connection)
Person.init(connection)
Participation.init(connection)

Film.associate(connection.models)
Genre.associate(connection.models)
Person.associate(connection.models)
Participation.associate(connection.models)

module.exports = connection
