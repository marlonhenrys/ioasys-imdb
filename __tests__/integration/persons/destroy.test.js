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

  describe('DELETE /persons/:id', () => {
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
    })

    test('Should return 204 when admin delete a persons', async () => {
      const response = await request(app)
        .delete(`${url}/${person.id}`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 404 when a admin tries to delete a person that does not exist', async () => {
      const response = await request(app)
        .delete(`${url}/9999`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Pessoa não encontrada')
      )
    })
  })
})
