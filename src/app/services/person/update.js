const personRepository = require('../../repositories/PersonRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

module.exports = async data => {
  const person = await personRepository.findById(data.id)

  if (!person) {
    throw new ApplicationError('Pessoa não encontrada', HttpStatus.NOT_FOUND)
  }

  if (data.name) { person.name = data.name }
  if (data.biography) { person.biography = data.biography }

  await person.save()
}
