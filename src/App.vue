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
        {
          title: 'Solicitud cta. cte',
          icon: 'mdi-chevron-right',
          route: 'CurrentAccount'
        },
        {
          title: 'Convenio',
          icon: 'mdi-chevron-right',
          route: 'Convenios'
        },
        {
          title: 'Cambio boleto',
          icon: 'mdi-chevron-right',
          route: 'ChangeTicket'
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
          title: 'Club de beneficios',
          icon: 'mdi-chevron-right',
          route: 'PullmanPass'
        },
        {
          title: 'Confirmacion De Regreso',
          icon: 'mdi-chevron-right',
          route: 'ConfirmationServicesPanel'
        },
        {
          title: 'Cuponera',
          icon: 'mdi-chevron-right',
          route: 'couponServicesPanel'
        },
        {
          title: 'Datos Pasajero',
          icon: 'mdi-chevron-right',
          route: 'passengerDataPanel'
        },
        {
          title: 'Costa Pass',
          icon: 'mdi-chevron-right',
          route: 'costaPass'
        }
      ]
    }
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

.vue-slider-dot{
  z-index: 1!important;
}
</style>
