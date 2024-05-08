const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())

app.get('/api/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const startTime = Date.now()

  const timer = setInterval(() => {
    if (Date.now() - startTime >= 10000) {
      res.write('event:close\ndata:{}\n\n')
      res.end()
      clearInterval(timer)
      return
    }
    const data = { message: 'HelloWorld', timestamp: Date.now() }
    res.write(`data:${JSON.stringify(data)}\n\n`)
  }, 1000)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
