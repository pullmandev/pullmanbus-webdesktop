import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        blue_dark: '#1110AD',
        blue: '#0078DB',
        blue_light: '#2069E0',
        blue_light2: '#A7B8EA',
        blue_light3: '#6b9cfb',
        blue_variant: '#4AC2CE',
        background_blue: '#e4ecfe',
        yellow: '#FFA71A',
        orange: '#FF5000',
        orange_dark: '#EA4006',
        $green: '#00ae12',
        light: '#F7F7F7'
      },
      dark: {
        blue_dark: '#1110AD',
        blue: '#1715E6',
        blue_light: '#2069E0',
        blue_light2: '#A7B8EA',
        blue_light3: '#6b9cfb',
        blue_variant: '#4AC2CE',
        background_blue: '#e4ecfe',
        yellow: '#FFA71A',
        orange: '#FF5500',
        orange_dark: '#EA4006',
        $green: '#00ae12',
        light: '#F7F7F7'
      }
    }
  }
})
