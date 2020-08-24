const { role } = require('../../utils/enumUser')

module.exports = (action, params, currentRole) => {
  const { id } = params
  let permission = false

  switch (action) {
    case 'POST /genres':
    case `PUT /genres/${id}`:
      permission = currentRole === role.ADM
      break
  }

  return permission
}
