import { createRouter, createWebHistory } from 'vue-router'
import DrawBoard from '@/views/DrawBoard'
import Home from '@/views/Home'
import Room from '@/views/Room'
import store from '@/store'

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


router.beforeEach((to, from, next) => {
  if (to.fullPath === '/room') {
    if (!sessionStorage.getItem('username')) {
      next('/home')
    } else {
      store.state.userStatus.username = sessionStorage.getItem('username')
      next()
    }

  }
  else {
    next()
  }

})

export default router
