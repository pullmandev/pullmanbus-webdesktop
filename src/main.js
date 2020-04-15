import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store, { addStoreProperty } from './store'
import vuetify from './plugins/vuetify'
import MultiLanguage from 'vue-multilanguage'
import ES from './translations/es'
import EN from './translations/en'
import('./assets/base.css')

Vue.use(MultiLanguage, {
  default: 'es',
  es: ES.es,
  en: EN.en
})
Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

addStoreProperty('$translate', app.translate)
