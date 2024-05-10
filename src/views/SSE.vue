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
import axios from 'axios'
import { fetchEventSource } from '@microsoft/fetch-event-source'

export default {
  data () {
    return {
      sseList: []
    }
  },
  created () {
    const URL = 'http://localhost:3000/api/sse'
    this.createSSE(URL)
    // this.createAxios(URL)
    // this.createXHR(URL)
    // this.createFetch(URL)
    // this.createFetchEventSource(URL)
  },
  methods: {
    createSSE (url) {
      const source = new EventSource(url)

      source.addEventListener('message', event => {
        const { data } = event
        const parseData = JSON.parse(data)
        const { message, timestamp } = parseData
        this.sseList.push(`Message: ${message} at ${timestamp}`)
        if (message === 'close') {
          // 一定要主动close 否则浏览器会间隔性的无休止调用SSE
          source.close()
        }
      })

      source.addEventListener('error', event => {
        console.error(event)
      })

      source.addEventListener('foo', event => {
        // 后续的不间断触发 会在请求头中设置字段Last-Event-Id
        console.warn(event.data, event.lastEventId)
      })
    },
    // axios会在res.send()触发后 接收到全量message 而非逐个接收
    // [axios目前不支持接收stream](https://github.com/axios/axios/issues/479)
    createAxios (url) {
      return axios.get(url).then(res => {
        console.log(res)
      })
    },
    // XHR + streaming
    createXHR (url) {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.timeout = 10000
      xhr.ontimeout = function () {
        console.error('Request timed out!')
      }
      xhr.onprogress = function () {
        const responseText = xhr.responseText
        console.error(xhr.prevLen)
        const chunk = responseText.slice(xhr.prevLen)
        xhr.prevLen = responseText.length
        console.log(chunk)
      }
      xhr.onload = function () {
        console.log('Done!')
      }
      xhr.send()
    },
    createFetch (url) {
      fetch(url).then(async res => {
        const reader = res.body.getReader()
        while (true) {
          const result = await reader.read()
          const { value, done } = result
          const utf8Decoder = new TextDecoder('utf-8')
          const data = utf8Decoder.decode(value, { stream: true })
          console.log(data, done)
          if (done) {
            break
          }
        }
      })
    },
    async createFetchEventSource (url) {
      await fetchEventSource(url, {
        onmessage (event) {
          console.log(event.data, event)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
