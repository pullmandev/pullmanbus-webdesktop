<template>
  <v-row>
    <v-card color="orange" class="pt-12">
      <v-card-text class="py-0 white--text"
        ><h2>{{ $t('travel_details') }}</h2></v-card-text
      >
      <v-container>
        <v-form>
          <v-row dense>
            <v-col cols="12">
              <cities-from-list direction="from" v-model="fromCity" />
            </v-col>
            <v-col cols="12" class="pa-0 d-flex justify-center align-center">
              <v-btn icon color="white" @click="exchangeCities">
                <v-icon>autorenew</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12">
              <cities-to-list direction="to" v-model="toCity" />
            </v-col>
            <v-col cols="6">
              <calendar direction="from" v-model="fromDate" />
            </v-col>
            <v-col cols="6">
              <calendar direction="to" v-model="toDate" :fromDate="fromDate" />
            </v-col>
            <v-col cols="12">
              <v-btn
                @click="validateSearch"
                block
                color="blue_dark"
                class="font white--text rounded-search pa-0"
                :disabled="loadingServices"
                >{{ $t('search') }}</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-row>
</template>

<script>
import CitiesFromList from '@/views/Home/SearchPanel/CitiesFrom'
import CitiesToList from '@/views/Home/SearchPanel/CitiesTo'
import Calendar from '@/views/Services/SearchPanel/Calendar'
import { mapGetters } from 'vuex'

const moment = require('moment')
export default {
  data: () => ({
    fromDate: null,
    toDate: null,
    fromCity: null,
    toCity: null
  }),
  components: {
    CitiesFromList,
    CitiesToList,
    Calendar
  },
  mounted() {
    this.fromDate = this.$store.state.searching.from_date
    this.toDate = this.$store.state.searching.to_date
    this.fromCity = this.$store.state.searching.from_city
    this.toCity = this.$store.state.searching.to_city
  },
  computed: {
    searching: {
      get() {
        moment.locale(this.$store.state.language)
        return this.$store.state.searching
      }
    },
    ...mapGetters({
      loadingServices: ['getLoadingService']
    })
  },
  watch: {
    fromCity(value) {
      let searchingCity = value.codigo
      this.$store.dispatch('LOAD_CITIES_TO_LIST', {
        searchingCity
      })
    },
    fromDate(value) {
      const diff = moment(this.toDate).diff(value, 'days')
      if (diff <= -1 || value == null) {
        this.toDate = null
      }
    }
  },
  methods: {
    validateSearch() {
      this.setUserSearchingData()
      this.$store.dispatch('LOAD_SERVICES_LIST', {
        goTo: true,
        fromDate: this.fromDate,
        toDate: this.toDate,
        fromCity: this.fromCity,
        toCity: this.toCity
      })
    },
    setUserSearchingData() {
      //console.log('fromDate', this.fromCity)
      //console.log('toCity', this.toCity)
      this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {
        date: this.fromDate,
        direction: 'from'
      })
      this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {
        date: this.toDate,
        direction: 'to'
      })
      this.$store.dispatch('SET_NEW_USER_SEARCHING_CITY', {
        city: this.fromCity,
        direction: 'from'
      })
      this.$store.dispatch('SET_NEW_USER_SEARCHING_CITY', {
        city: this.toCity,
        direction: 'to'
      })
    },
    exchangeCities() {
      const fromCity = this.fromCity
      this.fromCity = this.toCity
      this.toCity = fromCity
    }
  }
}
</script>

<style>
.blue-light {
  background-color: var(--var-light-blue) !important;
}

.blue-dark {
  background-color: var(--var-dark-blue) !important;
}

.font {
  font-family: Poppins regular;
}
@media (max-width: 960px){
  .col-10{
    max-width: 100%;
  }
}
</style>
