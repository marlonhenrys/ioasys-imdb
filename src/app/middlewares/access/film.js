const { role } = require('../../utils/enumUser')

module.exports = (action, currentRole, id) => {
  let permission = false

  switch (action) {
    case 'POST /films':
      permission = currentRole === role.ADM
      break
    case 'GET /films':
      permission = true
      break
    case `GET /films/${id}`:
      permission = true
      break
    case `PUT /films/${id}`:
      permission = currentRole === role.ADM
      break
    case `DELETE /films/${id}`:
      permission = currentRole === role.ADM
      break
  }

  return permission
}
