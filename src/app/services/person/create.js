const personRepository = require('../../repositories/PersonRepository')

module.exports = person => personRepository.create(person)
