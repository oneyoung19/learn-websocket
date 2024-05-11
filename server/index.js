const express = require('express')
const cors = require('cors')
const sseRouter = require('./sse/index')
const wsServer = require('./websocket/index')

const app = express()
const PORT = 3000

app.use(cors())
app.use(sseRouter)

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

server.on('upgrade', (req, socket, head) => {
  wsServer.handleUpgrade(req, socket, head, (ws) => {
    wsServer.emit('connection', ws, req)
  })
})
