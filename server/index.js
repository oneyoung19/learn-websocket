const express = require('express')
const cors = require('cors')
const sseRouter = require('./sse/index')
const websocketRouter = require('./websocket/index')

const app = express()
const PORT = 3000

app.use(cors())
app.use(sseRouter)
app.use(websocketRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
