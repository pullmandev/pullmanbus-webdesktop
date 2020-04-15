import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        blue_dark: '#1110AD',
        blue: '#1715E6',
        blue_light: '#2069E0',
        blue_variant: '#4AC2CE',
        yellow: '#FFA71A',
        orange: '#FF5500',
        orange_dark: '#EA4006'
      },
      dark: {
        blue_dark: '#1110AD',
        blue: '#1715E6',
        blue_light: '#2069E0',
        blue_variant: '#4AC2CE',
        yellow: '#FFA71A',
        orange: '#FF5500',
        orange_dark: '#EA4006'
      }
    }
  }
})
