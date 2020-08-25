const { role } = require('../../utils/enumUser')

module.exports = (action, params, currentRole) => {
  const { id } = params
  let permission = false

  switch (action) {
    case 'POST /genres':
    case `PUT /genres/${id}`:
    case `DELETE /genres/${id}`:
      permission = currentRole === role.ADM
      break

    case 'GET /genres':
      permission = true
      break
  }

  return permission
}
