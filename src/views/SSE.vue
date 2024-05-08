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
    // axios.get(URL).then(res => {
    //   console.log(res)
    // })
    const evtSource = new EventSource(URL)

    evtSource.onmessage = event => {
      const eventObject = JSON.parse(event.data)
      const message = 'Message: ' + eventObject.message + ' at ' + eventObject.timestamp
      this.sseList.push(message)
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
