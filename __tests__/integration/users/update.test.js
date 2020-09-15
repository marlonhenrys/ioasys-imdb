const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('User endpoints', () => {
  const url = '/api/v1/users'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  const user = {
    name: faker.name.findName(),
    username: faker.random.alphaNumeric(6),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  describe('PUT /users/:id', () => {
    beforeAll(async () => {
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

    test('Should return 204 when user updates your data', async () => {
      const response = await request(app)
        .put(`${url}/${user.id}`)
        .send({
          name: faker.name.findName(),
          username: faker.random.alphaNumeric(6),
          email: faker.internet.email()
        })
        .set({ Authorization: `Bearer ${user.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 204 when admin updates a user data', async () => {
      const response = await request(app)
        .put(`${url}/${user.id}`)
        .send({
          name: faker.name.findName(),
          username: faker.random.alphaNumeric(6),
          email: faker.internet.email()
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 403 when a user tries to update a another user data', async () => {
      const response = await request(app)
        .put(`${url}/${admin.id}`)
        .send({
          name: 'Name Update by User'
        })
        .set({ Authorization: `Bearer ${user.token}` })

      expect(response.status).toBe(403)
      expect(response.body.message).toEqual(
        expect.stringMatching('Você não tem permissão para editar este registro')
      )
    })

    test('Should return 404 when a admin tries to update a user that does not exist', async () => {
      const response = await request(app)
        .put(`${url}/9999`)
        .send({
          name: 'New Name'
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Usuário não encontrado')
      )
    })

    test('Should return 422 when username is invalid', async () => {
      const response = await request(app)
        .put(`${url}/${user.id}`)
        .send({
          username: faker.random.alphaNumeric(33)
        })
        .set({ Authorization: `Bearer ${user.token}` })

      expect(response.status).toBe(422)
      expect(response.body.message).toEqual(
        expect.stringMatching('O nome de usuário deve possuir no máximo 30 caracteres')
      )
    })
  })
})
