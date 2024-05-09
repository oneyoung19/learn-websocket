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
    console.log(source, source.readyState)

    source.onmessage = event => {
      const { data } = event
      const parseData = JSON.parse(data)
      const { message, timestamp } = parseData
      console.log(message)
      this.sseList.push(`Message: ${message} at ${timestamp}`)
      if (message === 'close') {
        // 一定要主动close 否则浏览器会间隔性的无休止
        source.close()
      }
    }

    source.onerror = event => {
      console.error(event)
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
