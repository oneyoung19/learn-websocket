const express = require('express')
const router = express.Router()

router.get('/api/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const startTime = Date.now()

  const timer = setInterval(() => {
    if (Date.now() - startTime >= 3000) {
      clearInterval(timer)
      // 测试发现 id字段不在data字段后 也起作用
      res.write('event:foo\nid:foo\nretry: 10000\ndata:{ message: \'foo\' }\n\n')
      const data = { message: 'close', timestamp: new Date() }
      res.write(`data:${JSON.stringify(data)}\n\n`)
      // res.end() 不会关闭SSE连接 但会触发error事件监听
      res.end()
      return
    }
    const data = { message: 'HelloWorld', timestamp: new Date() }
    res.write(`data:${JSON.stringify(data)}\n\n`)
  }, 1000)
})

module.exports = router
