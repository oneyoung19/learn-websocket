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

  // https://juejin.cn/post/7355666189475954725
  // const sendEvent = () => {
  //   // 检查是否已经发送了10秒
  //   if (Date.now() - startTime >= 10000) {
  //     res.write('event: close\ndata: {}\n\n') // 发送一个特殊事件通知客户端关闭
  //     res.end() // 关闭连接
  //     return
  //   }
  //   const data = { message: 'Hello World', timestamp: new Date() }
  //   res.write(`data: ${JSON.stringify(data)}\n\n`)
  //   // 每隔2秒发送一次消息
  //   setTimeout(sendEvent, 2000)
  // }

  // sendEvent()
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
