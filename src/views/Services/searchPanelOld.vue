<template>
  <div class="mt-5 font">
    <v-expansion-panel>
      <v-expansion-panel-content class="white--text blue-light hideArrowCollapse elevation-8 pt-3">

        <div slot="header">

          <v-btn fab small class="blue-dark elevation-8" bottom right absolute slot="activator">
            <img src='/static/imgs/logos/Editar-fechas.png' class="btnLogo"/>
          </v-btn>
          <v-layout row wrap align-center>

            <v-flex xs4 sm6 md4 lg4  offset-xs4 offset-sm3 offset-md4 offset-lg4>
              
              <v-list-tile class="miniTitle">
                <v-list-tile-action>
                  <img src="/static/imgs/logos/Fecha-desde.png" class="btnLogo"/>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="capitalize">
                    {{searching.from_date | largeDateFormat}}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile class="miniTitle">
                <v-list-tile-action>
                  <img src="/static/imgs/logos/Fecha-desde.png" class="btnLogo rotate"/>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title class="capitalize">
                    {{searching.to_date | largeDateFormat}}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-flex>
          </v-layout>
        </div>
        <v-card color="blue-light" class="white--text ">

          <v-layout row wrap class="pt-3 pb-3">

            <v-flex xs12 sm6 md2 class="pl-3">
              <cities-list direction="from"/>
            </v-flex>

            <v-flex xs12 sm6 md2 class="pl-3">
              <cities-list direction="to"/>
            </v-flex>

            <v-flex xs12 sm6 md3 class="pl-3">
              <calendar direction="from"/>
            </v-flex>

            <v-flex xs12 sm6 md3 class="pl-3">
              <calendar direction="to"/>
            </v-flex>

            <v-flex xs12 sm6 md2>
              <v-btn @click="validateSearch" class="font blue-dark white--text" :disabled="loadingServices">Buscar</v-btn>
            </v-flex>

          </v-layout>

        </v-card>

      </v-expansion-panel-content>
    </v-expansion-panel>

  </div>
</template>

<script>
  import CitiesList from '@c/Cities'
  import Calendar from '@c/Calendar'
import { mapGetters } from 'vuex'

  const moment = require('moment')
  export default {
    data () {
      return {}
    },
    components: {
      CitiesList,
      Calendar
    },
    mounted () {
      if (!this.searching.from_city || !this.searching.to_city) {
        this.$router.push('/')
      }
    },
    filters: {
      largeDateFormat (value) {
        if (!value) return ''
        return moment(value).format('dddd LL')
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

<style>
  .btnLogo {
    margin: 0.3rem;
    height: 1.5rem;
    width: 1.5rem;
  }
  
  .btnLogo.rotate {
    transform: rotate(180deg);
  }

  .blue-light {
    background-color: var(--var-light-blue) !important;
  }

  .blue-dark {
    background-color: var(--var-dark-blue) !important;
  }

  div.list__tile__action.miniIcon {
    min-width: 30px;
  }

  li.miniTitle {
    height: 25px;
  }

  li.miniTitle .list__tile {
    height: 20px;
  }

  .hideArrowCollapse .header__icon {
    display: none;
  }

  ul.breadcrumbs {
    padding: 0px 12px;
  }
  .font {
    font-family: Poppins regular;
  }
</style>
