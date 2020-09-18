const request = require('supertest')
const app = require('../../../src/config/app')

describe('Genre endpoints', () => {
  const url = '/api/v1/genres'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  const genre = {
    name: 'Romance'
  }

  describe('DELETE /genres/:id', () => {
    beforeAll(async () => {
      const responseLoginAdmin = await request(app)
        .post('/api/v1/signin')
        .send({
          email: admin.email,
          password: admin.password
        })

      admin.token = responseLoginAdmin.body.token

      const responseCreateGenre = await request(app)
        .post('/api/v1/genres')
        .send(genre)
        .set({ Authorization: `Bearer ${admin.token}` })

      genre.id = responseCreateGenre.body.id
    })

    test('Should return 204 when admin delete a genre', async () => {
      const response = await request(app)
        .delete(`${url}/${genre.id}`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(204)
    })

    test('Should return 404 when a admin tries to delete a genre that does not exist', async () => {
      const response = await request(app)
        .delete(`${url}/9999`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(
        expect.stringMatching('Gênero não encontrado')
      )
    })
  })
})
