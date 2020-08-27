const personRepository = require('../../repositories/PersonRepository')
const ApplicationError = require('../../utils/errorHandler')
const HttpStatus = require('http-status-codes')

module.exports = async persons => {
  const participations = []

  for (const { id, role } of persons) {
    const person = await personRepository.findById(id)

    if (!person) {
      throw new ApplicationError(`Pessoa de ID ${id} não encontrada`, HttpStatus.NOT_FOUND)
    }

    participations.push({ person, role })
  }

  return participations
}
