<template>
  <div>websocket</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
    }
  },
  mounted () {
    const URL = 'http://localhost:3000/api/websocket'
    axios.get(URL).then(res => {
      console.log(res)
    })
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
