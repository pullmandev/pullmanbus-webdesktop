import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import redirectToMyProfile from '@/helpers/redirectToMyProfile'

//Home
import Home from '../views/Home/Index.vue'

//Services
import ServicesContainer from '@/views/Services/Index.vue'
import ListContainer from '@/views/Services/Services.vue'
import Data from '@/views/Services/stepper/ConfirmationPaymentData'
import List from '@/views/Services/stepper/List/Index'
import Payment from '@/views/Services/Payment/Index.vue'
import Confirmation from '@/views/Services/Confirmation.vue'

//Confirmation Services
import ConfirmationServicesContainer from '@/views/ConfirmationServices/Index.vue'
import ConfirmationSearchPanel from '@/views/ConfirmationServices/SearchPanel.vue'
import ConfirmationServicesList from '@/views/ConfirmationServices/List/Index.vue'
import ConfirmationServiceSucceed from '@/views/ConfirmationServices/Voucher.vue'
import ConfirmationServiceFail from '@/views/ConfirmationServices/Fail.vue'

// Profile
import Profile from '@/views/Profile/Index'
import Purchases from '@/views/Profile/Purchases'
import PersonalData from '@/views/Profile/PersonalData'
import CancelPurchase from '@/views/Profile/CancelPurchase'
import ProfilePassword from '@/views/Profile/ProfilePassword'

//Payment response
import Voucher from '@/views/Services/Voucher'
import Fail from '@/views/Services/Fail.vue'
import Error404 from '@/views/ErrorPages/Error404.vue'

//Menu
import MenuForm from '@/views/Menu/Form'
import MenuContainer from '@/views/Menu/Index'
import ChangeTicket from '@/views/Menu/ChangeTicket/ChangeTicket'
import SearchTicket from '@/views/Menu/ChangeTicket/SearchTicket'
import VoucherChangeTicket from '@/views/Menu/ChangeTicket/Voucher.vue'
import FailChangeTicket from '@/views/Menu/ChangeTicket/Fail.vue'
import Contact from '@/views/Menu/Contact'

//Docs
import Docs from '@/views/Docs/Index'
import Terms from '@/views/Docs/Terms'
import Rights from '@/views/Docs/Rights'
import FAQs from '@/views/Docs/FAQs'
import Privacy from '@/views/Docs/Privacy'
import PullmanPass from '@/views/Docs/PullmanPass'
import Convenios from '@/views/Docs/Convenios/Index'
import AgencyList from '@/views/Menu/Agencies/List'
import Agency from '@/views/Menu/Agencies/Detail'

//Coupon Services
import CouponServicesContainer from '@/views/CouponServices/Index.vue'
import CouponSearchPanel from '@/views/CouponServices/SearchPanel.vue'
import CouponDetail from '@/views/CouponServices/Detail/Index.vue'
import ConfirmationCoupon from '@/views/CouponServices/ConfirmationCoupon.vue'
import VoucherCoupon from '@/views/CouponServices/VoucherCoupon.vue'
import FailCoupon from '@/views/CouponServices/FailCoupon.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/agencies',
    component: Docs,
    children: [
      {
        path: '/',
        name: 'Agencies',
        component: AgencyList
      },
      {
        props: route => ({ agency: route.query }),
        path: 'city',
        name: 'AgencyCity',
        component: Agency
      }
    ]
  },
  {
    component: MenuContainer,
    path: '/request',
    children: [
      {
        path: 'trip',
        name: 'Trip',
        component: MenuForm,
        props: { type: 'Trip' }
      },
      {
        path: 'currentAccount',
        name: 'CurrentAccount',
        component: MenuForm,
        props: { type: 'CurrentAccount' }
      },
      {
        path: 'changeTicket',
        name: 'ChangeTicket',
        component: ChangeTicket,
        props: route => ({ params: route.query })
      },
      {
        path: 'voucherChangeTicket',
        name: 'VoucherChangeTicket',
        component: VoucherChangeTicket,
        props: route => ({ params: route.query })
      },
      {
        path: 'failChangeTicket',
        name: 'FailChangeTicket',
        component: FailChangeTicket,
        props: route => ({ params: route.query })
      },
      {
        path: 'searchTicket',
        name: 'SearchTicket',
        component: SearchTicket
      },
      {
        path: 'contact',
        name: 'Contact',
        component: Contact
      }
    ]
  },
  {
    path: '/services',
    component: ServicesContainer,
    children: [
      {
        path: '/',
        name: 'Services',
        component: ListContainer,
        children: [
          {
            path: '/',
            name: 'List',
            component: List
          },
          {
            path: 'servicesPaymentData',
            name: 'ServicesPaymentData',
            component: Data
          }
        ]
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
    path: '/confirmationServices',
    component: ConfirmationServicesContainer,
    children: [
      {
        path: '',
        name: 'ConfirmationServicesPanel',
        component: ConfirmationSearchPanel
      },
      {
        path: 'servicesList',
        name: 'ServicesList',
        component: ConfirmationServicesList,
        beforeEnter(to, from, next) {
          if (store.getters.getSearchingConfirmation.ticket.confirmation) {
            next({
              name: 'ConfirmationServicesPanel'
            })
          } else {
            next()
          }
        }
      },
      {
        path: 'confirmationServiceSucceed',
        name: 'ConfirmationServiceSucceed',
        component: ConfirmationServiceSucceed,
        props: route => ({ data: route.query })
      },
      {
        path: 'confirmationServiceFail',
        name: 'ConfirmationServiceFail',
        component: ConfirmationServiceFail,
        props: route => ({ data: route.query })
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
        component: Purchases,
        beforeEnter(to, from, next) {
          redirectToMyProfile(store, next)
        }
      },
      {
        name: 'cancel_purchase',
        path: 'cancel_purchase',
        component: CancelPurchase,
        beforeEnter(to, from, next) {
          redirectToMyProfile(store, next)
        }
      },
      {
        name: 'profile_pass',
        path: 'password',
        component: ProfilePassword,
        beforeEnter(to, from, next) {
          redirectToMyProfile(store, next)
        }
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
      },
      {
        path: 'rights',
        name: 'rights',
        component: Rights
      },
      {
        path: 'FAQs',
        name: 'FAQs',
        component: FAQs
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: Privacy
      },
      {
        path: 'pullmanPass',
        name: 'PullmanPass',
        component: PullmanPass
      },
      {
        path: 'convenios',
        name: 'Convenios',
        component: Convenios
      }
    ]
  },
  {
    path: '/couponServices',
    component: CouponServicesContainer,
    children: [
      {
        path: '',
        name: 'couponServicesPanel',
        component: CouponSearchPanel
      },
      {
        path: 'couponDetail',
        name: 'CouponDetail',
        component: CouponDetail
      },
      {
        path: 'confirmationCoupon/:id',
        name: 'confirmationCoupon',
        component: ConfirmationCoupon
      },
      {
        path: 'voucherCoupon/:id',
        name: 'voucherCoupon',
        component: VoucherCoupon
      },
      {
        path: 'failCoupon/:id',
        name: 'failCoupon',
        component: FailCoupon
      }
    ]
  },
  { path: '*', component: Error404 }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.afterEach((to, from) => {
  store.dispatch('SET_HISTORY', { from, to })
})
export default router
