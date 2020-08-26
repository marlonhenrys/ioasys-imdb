const { role } = require('../../utils/enumUser')

module.exports = (action, params, currentRole) => {
  const { id } = params
  let permission = false

  switch (action) {
    case 'POST /persons':
    case `PUT /persons/${id}`:
    case `DELETE /persons/${id}`:
      permission = currentRole === role.ADM
      break

    case 'GET /persons':
    case `GET /persons/${id}`:
      permission = true
      break
  }

  return permission
}
