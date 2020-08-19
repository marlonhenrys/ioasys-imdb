const { role } = require('../../utils/enumUser')

module.exports = (action, params, currentRole) => {
  const { id, filmId, genreId } = params
  let permission = false

  switch (action) {
    case 'POST /films':
    case `PUT /films/${id}`:
    case `DELETE /films/${id}`:
    case `POST /films/${filmId}/genres`:
    case `DELETE /films/${filmId}/genres/${genreId}`:
      permission = currentRole === role.ADM
      break

    case 'GET /films':
    case `GET /films/${id}`:
    case 'GET /films/genres':
      permission = true
      break
  }

  return permission
}
