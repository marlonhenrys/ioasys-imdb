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

  describe('PATCH /users', () => {
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

    test('Should return 204 when user updates your status', async () => {
      const response = await request(app)
        .patch(url)
        .send({
          status: 'Inactive'
        })
        .set({ Authorization: `Bearer ${user.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 204 when admin updates the status of users', async () => {
      const response = await request(app)
        .patch(url)
        .send({
          users: [user.id],
          status: 'Active'
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 403 when a user tries to update a yourself status for Disabled', async () => {
      const response = await request(app)
        .patch(url)
        .send({
          status: 'Disabled'
        })
        .set({ Authorization: `Bearer ${user.token}` })

      expect(response.status).toBe(403)
      expect(response.body.message).toEqual(
        expect.stringMatching('Você não tem permissão realizar esta operação')
      )
    })

    test('Should return 403 when a admin tries to update a yourself status for Disabled', async () => {
      const response = await request(app)
        .patch(url)
        .send({
          users: [admin.id],
          status: 'Disabled'
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(403)
      expect(response.body.message).toEqual(
        expect.stringMatching('Não é possível alterar o próprio status para Disabled')
      )
    })

    test('Should return 403 when a admin tries to update a user status for Inactive', async () => {
      const response = await request(app)
        .patch(url)
        .send({
          users: [user.id],
          status: 'Inactive'
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(403)
      expect(response.body.message).toEqual(
        expect.stringMatching('Não é possível alterar o status de outro usuário para Inactive')
      )
    })

    test('Should return 404 when a admin tries to update a user that does not exist', async () => {
      const response = await request(app)
        .patch(url)
        .send({
          users: [9999],
          status: 'Disabled'
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Usuário de ID 9999 não encontrado')
      )
    })

    test('Should return 422 when status is invalid', async () => {
      const response = await request(app)
        .patch(url)
        .send({
          status: 'Deleted'
        })
        .set({ Authorization: `Bearer ${user.token}` })

      expect(response.status).toBe(422)
      expect(response.body.message).toEqual(
        expect.stringMatching('Status inválido')
      )
    })
  })
})
