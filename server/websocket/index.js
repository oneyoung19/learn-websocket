const ws = require('ws')
const { WebSocketServer } = ws

const wsServer = new WebSocketServer({
  noServer: true,
  path: '/api/websocket'
})

wsServer.on('connection', function connection (ws) {
  console.log('connection')
  ws.on('error', console.error)

  ws.on('message', function message (data) {
    console.log('received: %s', data)
  })

  ws.send('something')
})

module.exports = wsServer
