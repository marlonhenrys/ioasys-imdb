const request = require('supertest')
const faker = require('faker/locale/pt_BR')
const app = require('../../../src/config/app')
const truncate = require('../../utils/truncate')

describe('Report endpoints', () => {
  const url = '/api/v1/reports'

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

  const genre = {
    name: faker.lorem.word()
  }

  const person = {
    name: faker.name.findName(),
    biography: faker.lorem.paragraph()
  }

  const films = []

  const userRatings = [1, 0, 0, 1, 3, 4, 3, 4, 2, 2]
  const adminRatings = [3, 2, 1, 2, 1, 4, 3, 3, 0, 2]

  beforeAll(async () => {
    const responseLoginAdmin = await request(app)
      .post('/api/v1/signin')
      .send({
        email: admin.email,
        password: admin.password
      })

    admin.token = responseLoginAdmin.body.token

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

    const responseCreateGenre = await request(app)
      .post('/api/v1/genres')
      .send(genre)
      .set({ Authorization: `Bearer ${admin.token}` })

    genre.id = responseCreateGenre.body.id

    const responseCreatePerson = await request(app)
      .post('/api/v1/persons')
      .send(person)
      .set({ Authorization: `Bearer ${admin.token}` })

    person.id = responseCreatePerson.body.id

    await truncate.films()

    for (let index = 0; index < 10; index++) {
      const responseCreateFilm = await request(app)
        .post('/api/v1/films')
        .send({
          name: faker.name.title(),
          synopsis: faker.lorem.paragraph(),
          language: 'Português',
          release: faker.date.past(),
          duration: '1:45',
          genres: [
            genre.id
          ],
          persons: [
            {
              id: person.id,
              role: 'Diretor'
            }
          ]
        })
        .set({ Authorization: `Bearer ${admin.token}` })

      films.push(responseCreateFilm.body.id)
    }

    for (let index = 0; index < 10; index++) {
      await request(app)
        .post(`/api/v1/films/${films[index]}/ratings`)
        .send({
          value: userRatings[index]
        })
        .set({ Authorization: `Bearer ${user.token}` })

      await request(app)
        .post(`/api/v1/films/${films[index]}/ratings`)
        .send({
          value: adminRatings[index]
        })
        .set({ Authorization: `Bearer ${admin.token}` })
    }
  })

  describe('GET /reports/ranking', () => {
    test('Should return 200 with the 10 films with the highest average ratings', async () => {
      const response = await request(app)
        .get(`${url}/ranking`)

      expect(response.status).toBe(200)
      expect(response.body.length).toBe(10)
      expect(response.body[0].avgRating).toBe(4)
      expect(response.body[0].id).toBe(films[5])
      expect(response.body[9].avgRating).toBe(0.5)
      expect(response.body[9].id).toBe(films[2])
    })

    test('Should return 200 with the 3 films with the highest average ratings', async () => {
      const response = await request(app)
        .get(`${url}/ranking?size=3`)

      expect(response.status).toBe(200)
      expect(response.body.length).toBe(3)
      expect(response.body[0].avgRating).toBe(4)
      expect(response.body[0].id).toBe(films[5])
      expect(response.body[2].avgRating).toBe(3)
      expect(response.body[2].id).toBe(films[6])
    })

    test('Should return 204 when the ranking is empty', async () => {
      const response = await request(app)
        .get(`${url}/ranking?size=0`)

      expect(response.status).toBe(204)
    })
  })

  describe('GET /reports/graph', () => {
    test('Should return 200 with a list of average ratings and film count', async () => {
      const response = await request(app)
        .get(`${url}/graph`)

      expect(response.status).toBe(200)
      expect(response.body.length).toBe(7)
      expect(response.body[1].avgRating).toBe(1)
      expect(response.body[1].amount).toBe(2)
    })

    test('Should return 204 when there is no data for the graph', async () => {
      await truncate.films()

      const response = await request(app)
        .get(`${url}/graph`)

      expect(response.status).toBe(204)
    })
  })
})
