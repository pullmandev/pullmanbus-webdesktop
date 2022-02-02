import Vue from 'vue'
import App from './App.vue'
import './filters'
import router from './router'
import store, { addStoreProperty } from './store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/vueI18n'
import Notifications from 'vue-notification'
import VueCurrencyFilter from 'vue-currency-filter'
import * as VueGoogleMaps from 'vue2-google-maps'
import Fragment from 'vue-fragment'

// ASSETS
import './sass/general.scss'
import './assets/scss/main.scss'

Vue.use(Fragment.Plugin)
Vue.use(Notifications)
Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: false
})
Vue.prototype.$filters = Vue.options.filters
Vue.prototype.$seatTimer = null
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDUKVRPLZEXbgVyBaRlyC8wWuRzr2UlLmI'
  }
})
const app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
addStoreProperty('$i18n', app.$i18n)
