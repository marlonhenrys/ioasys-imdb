const validator = require('indicative/validator')
const ApplicationError = require('../app/utils/errorHandler')

class MyCustomFormatter {
  addError (error, field, rule, args) {
    const status = rule.startsWith('required') || rule === 'onlyAccept' ? 400 : 422
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
          [field]: fieldValue
        }
      })
      if (!row) { return true }
    }

    return false
  }
})

validator.extend('onlyAccept', {
  async: true,

  compile (args) {
    if (args.length !== 2) {
      throw new Error('OnlyAccept rule needs the field name and value')
    }

    return args
  },

  async validate (data, field, args) {
    const [attribute, value] = args

    const attributeValue = data.original[attribute]
    const fieldValue = data.original[field]

    return !(attributeValue !== value && fieldValue)
  }
})

validator.extend('numeric', {
  async: true,

  compile (args) {
    return args
  },

  async validate (data, field) {
    const fieldValue = data.original[field]

    if (!fieldValue) { return true }

    const reg = new RegExp('^\\d+$')

    return reg.test(fieldValue)
  }
})
