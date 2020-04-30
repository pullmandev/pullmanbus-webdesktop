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

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    SessionDialog
  },

  data: () => ({
    //
  })
}
</script>
