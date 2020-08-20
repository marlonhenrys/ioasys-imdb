const { role } = require('../../utils/enumUser')

module.exports = (action, params, currentRole) => {
  const { id } = params
  let permission = false

  switch (action) {
    case 'POST /films':
    case `PUT /films/${id}`:
    case `DELETE /films/${id}`:
      permission = currentRole === role.ADM
      break

    case 'GET /films':
    case `GET /films/${id}`:
      permission = true
      break
  }

  return permission
}
