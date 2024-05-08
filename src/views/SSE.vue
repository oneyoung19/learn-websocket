<template>
  <div>sse</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
    }
  },
  created () {
    axios.get('http://localhost:3000/api/sse').then(res => {
      console.log(res)
    })
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
</style>
