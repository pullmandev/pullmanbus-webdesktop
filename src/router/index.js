import redirectToMyProfile from '@/helpers/redirectToMyProfile'
import store from '@/store'
import Agencies from '@/views/Agencies'
import ConfirmationServiceFail from '@/views/ConfirmationServices/Fail.vue'
//Confirmation Services
import ConfirmationServicesContainer from '@/views/ConfirmationServices/Index.vue'
import ConfirmationServicesList from '@/views/ConfirmationServices/List/Index.vue'
import ConfirmationSearchPanel from '@/views/ConfirmationServices/SearchPanel.vue'
import ConfirmationServiceSucceed from '@/views/ConfirmationServices/Voucher.vue'
import ConfirmationCoupon from '@/views/CouponServices/ConfirmationCoupon.vue'
import CouponDetail from '@/views/CouponServices/Detail/Index.vue'
import FailCoupon from '@/views/CouponServices/FailCoupon.vue'
import OptionCoupon from '@/views/CouponServices/Validate/Index.vue'
import FormPublic from '@/views/CouponServices/FormPublic/Index.vue'
//import Agency from '@/views/Menu/Agencies/Detail'
//Coupon Services
import CouponServicesContainer from '@/views/CouponServices/Index.vue'
import CouponSearchPanel from '@/views/CouponServices/SearchPanel.vue'
import VoucherCoupon from '@/views/CouponServices/VoucherCoupon.vue'
import Convenios from '@/views/Docs/Convenios/Index'
import FAQs from '@/views/Docs/FAQs'
//Docs
import Docs from '@/views/Docs/Index'
import Privacy from '@/views/Docs/Privacy'
import PullmanPass from '@/views/Docs/PullmanPass'
import Rights from '@/views/Docs/Rights'
import Terms from '@/views/Docs/Terms'
import Error404 from '@/views/ErrorPages/Error404.vue'
import ChangeTicket from '@/views/Menu/ChangeTicket/ChangeTicket'
import FailChangeTicket from '@/views/Menu/ChangeTicket/Fail.vue'
import SearchTicket from '@/views/Menu/ChangeTicket/SearchTicket'
import VoucherChangeTicket from '@/views/Menu/ChangeTicket/Voucher.vue'
import CostaPass from '@/views/Menu/CostaPass'
//Menu
import MenuForm from '@/views/Menu/Form'
import MenuContainer from '@/views/Menu/Index'
import PassengerDataContainer from '@/views/PassengerDataServices/Index.vue'
import PassengerDataPanel from '@/views/PassengerDataServices/PassengerData.vue'
import CancelPurchase from '@/views/Profile/CancelPurchase'
// Profile
import Profile from '@/views/Profile/Index'
import PersonalData from '@/views/Profile/PersonalData'
import ProfilePassword from '@/views/Profile/ProfilePassword'
import Purchases from '@/views/Profile/Purchases'
import Confirmation from '@/views/Services/Confirmation.vue'
import Fail from '@/views/Services/Fail.vue'
//Services
import ServicesContainer from '@/views/Services/Index.vue'
import Payment from '@/views/Services/Payment/Index.vue'
import ListContainer from '@/views/Services/Services.vue'
import Data from '@/views/Services/stepper/ConfirmationPaymentData'
import List from '@/views/Services/stepper/List/Index'
//Payment response
import Voucher from '@/views/Services/Voucher'
import Vue from 'vue'
import VueRouter from 'vue-router'
//Home
import Home from '../views/Home/Index.vue'
// News
import News from '../views/News/Index.vue'

const Contact = () => import('@VIEWS/Contact')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/agencies',
    name: 'Agencies',
    component: Agencies
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
      },
      {
        path: 'optionCoupon',
        name: 'optionCoupon',
        component: OptionCoupon
      },
      {
        path: 'formPublic',
        name: 'formPublic',
        component: FormPublic
      }
    ]
  },
  {
    path: '/PassengerDataServices',
    component: PassengerDataContainer,
    children: [
      {
        path: '',
        name: 'passengerDataPanel',
        component: PassengerDataPanel
      },
      {
        path: '/passengerDataPanel/:boleto',
        name: 'passengerDataPanel',
        component: PassengerDataPanel
      }
    ]
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/ConvenioCostaPass',
    component: PassengerDataContainer,
    children: [
      {
        path: '',
        name: 'costaPass',
        component: CostaPass
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
