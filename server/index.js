const express = require('express')
const cors = require('cors')
const sseRouter = require('./sse/index')

const app = express()
const PORT = 3000

app.use(cors())
app.use(sseRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
