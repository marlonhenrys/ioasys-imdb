const request = require('supertest')
const app = require('../../../src/config/app')

describe('Genre endpoints', () => {
  const url = '/api/v1/genres'

  const admin = {
    email: 'admin@system.com.br',
    password: 'admin:p@ss'
  }

  const genre = {
    name: 'Ação'
  }

  describe('GET /genres', () => {
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

      await request(app)
        .post('/api/v1/genres')
        .send({
          name: 'Suspense'
        })
        .set({ Authorization: `Bearer ${admin.token}` })
    })

    test('Should return 200 and a list genres without filters', async () => {
      const response = await request(app)
        .get(url)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(200)
      expect(response).toMatchObject({
        body: expect.any(Array)
      })
      expect(response.body.length).toBeGreaterThan(1)
    })

    test('Should return 200 and a list genres with all filters', async () => {
      const response = await request(app)
        .get(`${url}?page=1&limit=5&name=${genre.name}`)
        .set({ Authorization: `Bearer ${admin.token}` })

      expect(response.status).toBe(200)
      expect(response).toMatchObject({
        body: expect.any(Array)
      })
      expect(response.body.length).toBe(1)
      expect(response.body[0].name).toEqual(
        expect.stringMatching(genre.name)
      )
    })

    test('Should return 204 when the genre list is empty', async () => {
      const response = await request(app)
        .get(`${url}?name=123`)

      expect(response.status).toBe(204)
    })
  })
})
