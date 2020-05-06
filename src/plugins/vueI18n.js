import Vue from 'vue'
import VueI18n from 'vue-i18n'
import es from '@/locales/es'
import en from '@/locales/en'

Vue.use(VueI18n)
const messages = {
  es,
  en
}

// Create VueI18n instance with options
export default new VueI18n({
  locale: 'es', // set locale
  messages // set locale messages
})
