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
import('./assets/base.css')

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDQB3QcRFQSQFoJSubx4AvoQl5_QYohIkg',
    libraries: 'places, drawing, geometry, visualization' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})

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

const app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
addStoreProperty('$i18n', app.$i18n)
