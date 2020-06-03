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
          route: 'Agencies'
        },
        {
          title: 'Viajes Especiales',
          icon: 'mdi-chevron-right',
          route: 'Trip'
        },
        // {
        //   title: 'Cuenta Corriente',
        //   icon: 'mdi-chevron-right',
        //   route: 'CurrentAccount'
        // },
        {
          title: 'Convenio',
          icon: 'mdi-chevron-right',
          route: 'Convenios'
        },
        {
          title: 'Cambio boleto',
          icon: 'mdi-chevron-right',
          route: 'SearchTicket'
        },
        {
          title: 'Preguntas frecuentes',
          icon: 'mdi-chevron-right',
          route: 'FAQs'
        },
        {
          title: 'Contacto',
          icon: 'mdi-chevron-right',
          route: 'Contact'
        },
        {
          title: 'Pullman Pass',
          icon: 'mdi-chevron-right',
          route: 'PullmanPass'
        },
        {
          title: 'CONFIRMACION DE REGRESO',
          icon: 'mdi-chevron-right',
          route: 'ConfirmationServicesPanel'
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
  }
}
</script>
<style lang="scss">
/* sass variables for sliders in filters components */
$themeColor: var(--var-orange);
@import '~vue-slider-component/lib/theme/default.scss';
@import '@/sass/mixins.scss';

@include track('body');
@include scrollbar('body');
@include thumb('body');

@include track('.v-dialog');
@include scrollbar('.v-dialog');
@include thumb('.v-dialog');

@include track('.v-menu__content');
@include scrollbar('.v-menu__content');
@include thumb('.v-menu__content', var(--var-blue));

@include track('textarea');
@include scrollbar('textarea');
@include thumb('textarea', var(--var-blue));
</style>
