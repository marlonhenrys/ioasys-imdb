const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')

describe('Person endpoints', () => {
  const url = '/api/v1/persons'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  const person = {
    name: faker.name.findName(),
    biography: faker.lorem.paragraph()
  }

  describe('GET /persons', () => {
    beforeAll(async () => {
      const responseLoginAdmin = await request(app)
        .post('/api/v1/signin')
        .send({
          email: admin.email,
          password: admin.password
        })

      admin.token = responseLoginAdmin.body.token

      const responseCreatePerson = await request(app)
        .post('/api/v1/persons')
        .send(person)
        .set({ Authorization: `Bearer ${admin.token}` })

      person.id = responseCreatePerson.body.id

      await request(app)
        .post('/api/v1/persons')
        .send({
          name: faker.name.findName(),
          biography: faker.lorem.paragraph()
        })
        .set({ Authorization: `Bearer ${admin.token}` })
    })

    test('Should return 200 and a list persons without filters', async () => {
      const response = await request(app)
        .get(url)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(200)
      expect(response).toMatchObject({
        body: expect.any(Array)
      })
      expect(response.body.length).toBeGreaterThan(1)
    })

    test('Should return 200 and a list persons with all filters', async () => {
      const response = await request(app)
        .get(`${url}?page=1&limit=5&name=${person.name}`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(200)
      expect(response).toMatchObject({
        body: expect.any(Array)
      })
      expect(response.body.length).toBe(1)
      expect(response.body[0].name).toEqual(
        expect.stringMatching(person.name)
      )
    })

    test('Should return 204 when the person list is empty', async () => {
      const response = await request(app)
        .get(`${url}?name=123`)

      expect(response.status).toBe(204)
    })
  })
})
