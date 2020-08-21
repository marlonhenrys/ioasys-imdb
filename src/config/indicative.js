const validator = require('indicative/validator')
const ApplicationError = require('../app/utils/errorHandler')
const HttpStatus = require('http-status-codes')

class MyCustomFormatter {
  addError (error, field, rule, args) {
    const status = rule.startsWith('required')
      ? HttpStatus.BAD_REQUEST
      : HttpStatus.UNPROCESSABLE_ENTITY

    throw new ApplicationError(error, status)
  }

  toJSON () {

  }
}

validator.configure({
  formatter: MyCustomFormatter
})

validator.extend('unique', {
  async: true,

  compile (args) {
    if (args.length !== 1) {
      throw new Error('Unique rule needs the model name')
    }

    return args
  },

  async validate (data, field, args) {
    const fieldValue = data.original[field]
    const [modelName] = args

    if (!fieldValue) { return true }

    if (modelName) {
      const Model = require(`../app/models/${modelName}`)
      const row = await Model.findOne({
        where: {
          [field]: fieldValue.toLowerCase()
        }
      })
      if (!row) { return true }
    }

    return false
  }
})
