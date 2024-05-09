<template>
  <div>
    <p>SSE</p>
    <ul>
      <li v-for="(item, index) in sseList" :key="index">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      sseList: []
    }
  },
  created () {
    const URL = 'http://localhost:3000/api/sse'
    const source = new EventSource(URL)

    source.onmessage = event => {
      const { data } = event
      const parseData = JSON.parse(data)
      const { message, timestamp } = parseData
      this.sseList.push(`Message: ${message} at ${timestamp}`)
      if (message === 'close') {
        // 一定要主动close 否则浏览器会间隔性的无休止调用SSE
        source.close()
      }
    }

    source.onerror = event => {
      console.error(event)
    }

    source.addEventListener('foo', event => {
      // 后续的不间断触发 会在请求头中设置字段Last-Event-Id
      console.warn(event.data, event.lastEventId)
    })
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
