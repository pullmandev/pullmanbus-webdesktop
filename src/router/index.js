import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Index.vue'
import Services from '../views/Services/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  }
]

const router = new VueRouter({
  routes
})

export default router
