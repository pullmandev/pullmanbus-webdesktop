<template>
  <v-app>
    <Header />
    <v-content>
      <LoadAlert />
      <LoadServiceAlert />
      <ErrorAlert />
      <InfoAlert />
      <router-view></router-view>
    </v-content>
    <Footer />
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
