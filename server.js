const http = require('http')
const app = require('./src/config/app')

const server = http.createServer(app)

server.listen(process.env.PORT, () => console.log('server listening...'))
