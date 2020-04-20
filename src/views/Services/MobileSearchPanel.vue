<template>
  <div>
    <header-app :logo="true"></header-app>
    <div style="margin-top: 56px"></div>
    <v-layout class="pb-2">
      <v-card class="pt-3 pr-2 pl-2 card-color">
        <v-card-text class="white--text">
          <v-flex xs12 class="pt-3">
            <v-card-text><h2 v-lang.travel_details></h2></v-card-text>
          </v-flex>
          <v-container grid-list-md>
            <v-form>
            <v-layout wrap>
              <v-flex xs12>
                <cities-list direction="from"/>
              </v-flex>
              <v-flex xs12>
                <cities-list direction="to"/>
              </v-flex>
              <v-flex xs12>
                <calendar :fromHome="false" direction="from"/>
              </v-flex>
              <v-flex xs12>
                <calendar :fromHome="false" direction="to"/>
              </v-flex>
              <v-flex xs12>
                <v-btn @click="validateSearch"
                block color="error"
                class="white--text rounded-search"
                :disabled="loadingServices" v-lang.search></v-btn>
              </v-flex>
            </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-layout>
    <div class="menu pb-2">
      <v-layout>
        <v-flex xs6 sm3>
          <v-btn flat color="primary" class="backText" @click="$router.back()">
            <v-icon>keyboard_arrow_left</v-icon>
            Regresar
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
  import HeaderApp from '@c/Header'
  import CitiesList from '@c/Cities'
  import Calendar from '@c/Calendar'
  import { mapGetters } from 'vuex'

  const moment = require('moment')
  export default {
    data () {
      return {}
    },
    components: {
      HeaderApp,
      CitiesList,
      Calendar
    },
    mounted () {
      if (!this.searching.from_city || !this.searching.to_city) {
        this.$router.push('/')
      }
    },
    computed: {
      searching: {
        get () {
          moment.locale(this.$store.state.language)
          return this.$store.state.searching
        }
      },
      ...mapGetters({
        loadingServices: ['getLoadingService']
      })
    },
    methods: {
      validateSearch () {
        this.$store.dispatch('LOAD_SERVICES_LIST')
      }
    }
  }
</script>

<style scoped>
  .backText {
    font-size: 18px;
  }
  .menu {
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: rgb(250, 250, 250);
  }
  .card-color {
    background-color: #3e82cc !important;
  }
  .blue-light {
    background-color: var(--var-light-blue) !important;
  }
  .blue-dark {
    background-color: var(--var-dark-blue) !important;
  }
</style>