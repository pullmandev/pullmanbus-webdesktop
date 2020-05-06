<template>
  <v-app>
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
    <SessionDialog />
  </v-app>
</template>

<script>
import Header from './components/Header/Index'
import Footer from './components/Footer'
import SessionDialog from '@/views/Login/Index'
import moment from 'moment'

export default {
  name: 'App',

  components: {
    Header,
    Footer,
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
