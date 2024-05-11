const ws = require('ws')

const { WebSocketServer } = ws
// ws://localhost:8080/api/websocket
const wss = new WebSocketServer({
  port: 8080,
  path: '/api/websocket'
})

wss.on('connection', function connection (ws) {
  console.log('connection')
  ws.on('error', console.error)

  ws.on('message', function message (data) {
    console.log('received: %s', data)
  })

  ws.send('something')
})
