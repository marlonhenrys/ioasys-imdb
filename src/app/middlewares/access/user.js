const { role } = require('../../utils/enumUser')

module.exports = (action, params, currentRole) => {
  const { id } = params

  let permission = false

  switch (action) {
    case 'POST /users':
    case 'GET /users':
    case `GET /users/${id}`:
      permission = currentRole === role.ADM
      break

    case `PUT /users/${id}`:
    case 'PATCH /users':
    case `DELETE /users/${id}`:
      permission = true
      break
  }

  return permission
}
