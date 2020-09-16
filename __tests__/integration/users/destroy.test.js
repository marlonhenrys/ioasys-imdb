const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('User endpoints', () => {
  const url = '/api/v1/users'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  let user

  describe('DELETE /users/:id', () => {
    beforeEach(async () => {
      user = {
        name: faker.name.findName(),
        username: faker.random.alphaNumeric(6),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      await request(app)
        .post('/api/v1/signup')
        .send(user)

      const responseLoginUser = await request(app)
        .post('/api/v1/signin')
        .send({
          email: user.email,
          password: user.password
        })

      user.token = responseLoginUser.body.token
      user.id = responseLoginUser.body.id

      const responseLoginAdmin = await request(app)
        .post('/api/v1/signin')
        .send({
          email: admin.email,
          password: admin.password
        })

      admin.token = responseLoginAdmin.body.token
      admin.id = responseLoginAdmin.body.id
    })

    test('Should return 204 when admin delete a user', async () => {
      const response = await request(app)
        .delete(`${url}/${user.id}`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 204 when user delete your account', async () => {
      const response = await request(app)
        .delete(`${url}/${user.id}`)
        .set({ Authorization: `Bearer ${user.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 403 when a user tries to delete a another user', async () => {
      const response = await request(app)
        .delete(`${url}/${admin.id}`)
        .set({ Authorization: `Bearer ${user.token}` })

      expect(response.status).toBe(403)
      expect(response.body.message).toEqual(
        expect.stringMatching('Você não tem permissão para excluir este registro')
      )
    })

    test('Should return 404 when a admin tries to delete a user that does not exist', async () => {
      const response = await request(app)
        .delete(`${url}/9999`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Usuário não encontrado')
      )
    })
  })
})
