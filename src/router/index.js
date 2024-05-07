import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sse',
    name: 'SSE',
    component: () => import('@/views/SSE')
  },
  {
    path: '/websocket',
    name: 'Websocket',
    component: () => import('@/views/Websocket')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
