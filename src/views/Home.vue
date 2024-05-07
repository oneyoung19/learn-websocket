<template>
  <div class="home">
    <el-button @click="$router.push({ name: 'SSE' })">SSE</el-button>
    <el-button @click="$router.push({ name: 'Websocket' })">websocket</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>
