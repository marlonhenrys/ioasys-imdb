const personRepository = require('../../repositories/PersonRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

module.exports = async personId => {
  const person = await personRepository.findById(personId)

  if (!person) {
    throw new ApplicationError('Pessoa não encontrada', HttpStatus.NOT_FOUND)
  }

  await person.destroy()
}
