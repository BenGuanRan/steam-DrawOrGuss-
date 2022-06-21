import { createRouter, createWebHistory } from 'vue-router'
import DrawBoard from '@/views/DrawBoard'
import Home from '@/views/Home'
import Room from '@/views/Room'
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/drawboard',
    component: DrawBoard
  },
  {
    path: '/room',
    component: Room
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
