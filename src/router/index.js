import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Index.vue'
import ServicesContainer from '../views/Services/Index.vue'
import Services from '../views/Services/Services.vue'
import Payment from '../views/Services/Payment/Index.vue'
import Confirmation from '@/views/Services/Confirmation.vue'
import Voucher from '@/views/Services/Voucher.vue'
import Fail from '@/views/Services/Fail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/services',
    component: ServicesContainer,
    children: [
      {
        path: '/services',
        name: 'Services',
        component: Services
      },
      {
        path: '/payment',
        name: 'Payment',
        component: Payment
      }
    ]
  },
  {
    path: '/confirmation/:id',
    name: 'confirmation',
    component: Confirmation
  },
  {
    path: '/voucher/:id',
    name: 'voucher',
    component: Voucher
  },
  {
    path: '/fail/:id',
    name: 'fail',
    component: Fail
  }
]

const router = new VueRouter({
  routes
})

export default router
