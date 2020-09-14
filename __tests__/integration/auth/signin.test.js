const request = require('supertest')
const app = require('../../../src/config/app')
const faker = require('faker/locale/pt_BR')

describe('Authenticate Endpoints', () => {
  const url = '/api/v1/signin'

  const credentials = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  describe('POST /signin', () => {
    test('Should return 200 when authenticate a user with valid credentials', async () => {
      const response = await request(app)
        .post(url)
        .send(credentials)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('token')
    })

    test('Should return 400 when user email is not provided', async () => {
      const response = await request(app)
        .post(url)
        .send({
          email: null,
          password: credentials.password
        })

      expect(response.status).toBe(400)
      expect(response.body.message).toEqual(
        expect.stringMatching('O email é obrigatório')
      )
    })

    test('Should return 401 when user password is incorrect', async () => {
      const response = await request(app)
        .post(url)
        .send({
          email: credentials.email,
          password: faker.internet.password()
        })

      expect(response.status).toBe(401)
      expect(response.body.message).toEqual(
        expect.stringMatching('Senha incorreta')
      )
    })

    test('Should return 404 when user email is not found', async () => {
      const response = await request(app)
        .post(url)
        .send({
          email: faker.internet.email(),
          password: credentials.password
        })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Usuário não encontrado')
      )
    })

    test('Should return 422 when user email is invalid', async () => {
      const response = await request(app)
        .post(url)
        .send({
          email: faker.lorem.sentence(),
          password: credentials.password
        })

      expect(response.status).toBe(422)
      expect(response.body.message).toEqual(
        expect.stringMatching('Formato de email inválido')
      )
    })
  })
})