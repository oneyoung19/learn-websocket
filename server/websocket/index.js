const express = require('express')
const router = express.Router()

router.get('/api/websocket', (req, res) => {
  res.send('websocket')
})

module.exports = router
