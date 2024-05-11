<template>
  <div>websocket</div>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
    }
  },
  mounted () {
    // const URL = 'http://localhost:3000/api/websocket'
    // axios.get(URL).then(res => {
    //   console.log(res)
    // })

    const WS_URL = 'ws://localhost:3000/api/websocket'
    this.createWebsocket(WS_URL)
  },
  methods: {
    createWebsocket (url) {
      const ws = new WebSocket(url)
      console.log(ws)
      ws.addEventListener('open', (event) => {
        console.log('open', event)
      })
      ws.addEventListener('message', (event) => {
        console.log('message', event)
      })
      ws.addEventListener('close', (event) => {
        console.log('close', event)
      })
      ws.addEventListener('error', (event) => {
        console.log('error', event)
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
