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
              <cities-list direction="from" outlined />
            </v-col>
            <v-col cols="12">
              <cities-list direction="to" outlined />
            </v-col>
            <v-col cols="6">
              <calendar :fromHome="false" outlined direction="from" />
            </v-col>
            <v-col cols="6">
              <calendar :fromHome="false" outlined direction="to" />
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
import CitiesList from '@/components/Cities'
import Calendar from '@/components/Calendar'
import { mapGetters } from 'vuex'

const moment = require('moment')
export default {
  data() {
    return {}
  },
  components: {
    CitiesList,
    Calendar
  },
  mounted() {
    if (!this.searching.from_city || !this.searching.to_city) {
      this.$router.push('/')
    }
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
  methods: {
    validateSearch() {
      const {
        from_date,
        to_date,
        from_city,
        to_city
      } = this.$store.state.searching
      this.$store.dispatch('LOAD_SERVICES_LIST', {
        fromDate: from_date,
        toDate: to_date,
        fromCity: from_city,
        toCity: to_city
      })
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
</style>
