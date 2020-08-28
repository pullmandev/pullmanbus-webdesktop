import Vue from 'vue'
import App from './App.vue'
import './filters'
import router from './router'
import store, { addStoreProperty } from './store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/vueI18n'
import Notifications from 'vue-notification'
import VueCurrencyFilter from 'vue-currency-filter'
import VueGtag from 'vue-gtag'
import('./assets/base.css')
import * as VueGoogleMaps from 'vue2-google-maps' 

Vue.use(
  VueGtag,
  {
    config: { id: 'UA-168212446-1' }
  },
  router
)
Vue.use(Notifications)
Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: '.',
  fractionCount: 0,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})
Vue.prototype.$filters = Vue.options.filters
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
