const { role } = require('../../utils/enumUser')

module.exports = (action, currentRole, id) => {
  let permission = false

  switch (action) {
    case 'POST /users':
      permission = currentRole === role.ADM
      break
    case 'GET /users':
      permission = currentRole === role.ADM
      break
    case `GET /users/${id}`:
      permission = currentRole === role.ADM
      break
    case `PUT /users/${id}`:
      permission = true
      break
    case 'PATCH /users':
      permission = true
      break
    case `DELETE /users/${id}`:
      permission = true
      break
  }

  return permission
}
