const { Router } = require('express')
const { ReportController } = require('../../app/controllers/api/v1')

const routes = Router()

routes.get('/reports/graph', ReportController.graph)
routes.get('/reports/ranking', ReportController.ranking)

module.exports = routes
