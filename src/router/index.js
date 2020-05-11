import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Index.vue'
import ServicesContainer from '../views/Services/Index.vue'
import Services from '../views/Services/Services.vue'
import Payment from '../views/Services/Payment/Index.vue'
import Confirmation from '@/views/Services/Confirmation.vue'

// Profile
import Profile from '@/views/Profile/Index'
import Purchases from '@/views/Profile/Purchases'
import PersonalData from '@/views/Profile/PersonalData'
import CancelPurchase from '@/views/Profile/CancelPurchase'
import ProfilePassword from '@/views/Profile/ProfilePassword'

//Payment response
import Voucher from '@/views/Services/Voucher.vue'
import Fail from '@/views/Services/Fail.vue'
import Error404 from '@/views/ErrorPages/Error404.vue'

//Docs
import Docs from '@/views/Docs/Index'
import Terms from '@/views/Docs/Terms'

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
        path: '',
        name: 'Services',
        component: Services
      },
      {
        path: 'payment',
        name: 'Payment',
        component: Payment
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
  },
  {
    path: '/profile',
    component: Profile,
    children: [
      {
        name: 'my_profile',
        path: 'my_profile',
        component: PersonalData
      },
      {
        name: 'purchases',
        path: 'purchases',
        component: Purchases
      },
      {
        name: 'cancel_purchase',
        path: 'cancel_purchase',
        component: CancelPurchase
      },
      {
        name: 'profile_pass',
        path: 'password',
        component: ProfilePassword
      }
    ]
  },
  {
    path: '/docs',
    component: Docs,
    children: [
      {
        path: 'terms',
        name: 'terms',
        component: Terms
      }
    ]
  },
  { path: '*', component: Error404 }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
