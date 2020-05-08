<template>
  <v-app>
    <Header :links="links" />
    <v-content>
      <LoadAlert />
      <LoadServiceAlert />
      <ErrorAlert />
      <InfoAlert />
      <router-view></router-view>
    </v-content>
    <Footer :links="links" />
    <SessionDialog />
  </v-app>
</template>

<script>
import Header from '@/components/Header/Index'
import Footer from '@/components/Footer'
import InfoAlert from '@/components/Notifications/InfoAlert'
import ErrorAlert from '@/components/Notifications/ErrorAlert'
import LoadServiceAlert from '@/components/Notifications/LoadServiceAlert'
import LoadAlert from '@/components/Notifications/LoadAlert'
import SessionDialog from '@/views/Login/Index'
import moment from 'moment'

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    InfoAlert,
    ErrorAlert,
    LoadServiceAlert,
    LoadAlert,
    SessionDialog
  },
  data() {
    return {
      links: [
        {
          title: 'Agencias',
          icon: 'mdi-chevron-right',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/agencias.jsf#header'
        },
        {
          title: 'Pullman Pass',
          icon: 'mdi-chevron-right',
          link: 'https://www.pullmanbus.cl/portalWAR/paginas/contenido/pass.jsf'
        },
        {
          title: 'Viajes Especiales',
          icon: 'mdi-chevron-right',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/viajesEspeciales.jsf#header'
        },
        {
          title: 'Cuenta Corriente',
          icon: 'mdi-chevron-right',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/cuentaCorrientes.jsf#header'
        },
        {
          title: 'Convenio',
          icon: 'mdi-chevron-right',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/convenio.jsf#header'
        },
        {
          title: 'Cambio boleto',
          icon: 'mdi-chevron-right',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/canjePublico.jsf#header'
        },
        {
          title: 'Preguntas frecuentes',
          icon: 'mdi-chevron-right',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/preguntasfrecuentes.jsf'
        },
        {
          title: 'Contacto',
          icon: 'mdi-chevron-right',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/contacto.jsf'
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {
      date: moment()
        .format()
        .split(':')[0]
        .split('T')[0],
      direction: 'from'
    })
    this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', { date: null })
  }
}
</script>
<style lang="sass">
/* sass variables for sliders in filters components */
$themeColor: var(--var-orange)
@import '~vue-slider-component/lib/theme/default.scss'
</style>
