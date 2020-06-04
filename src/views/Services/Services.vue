<template>
  <v-row>
    <v-col cols="2" class="pl-9 pr-0">
      <search-panel class="displayNoneSm"></search-panel>
      <filters class="displayNoneSm" />
    </v-col>
    <v-col cols="10">
      <!-- <stepper step="1" ref="stepper" /> -->
      <router-view></router-view>
    </v-col>
  </v-row>
</template>
<script>
import SearchPanel from '@/views/Services/searchPanel'
import Filters from '@/views/Services/filters/Index'
import { mapGetters } from 'vuex'
// import Stepper from '@/views/Services/stepper/Index'
export default {
  components: {
    SearchPanel,
    Filters
  },
  computed: mapGetters({ getHistory: ['getHistory'] }),
  mounted() {
    const { fromFail } = localStorage
    const fromRouteName = this.getHistory.from.name
    if (fromFail || fromRouteName === 'Payment') {
      if (fromFail) localStorage.removeItem('fromFail')
    } else if (this.$store.state.services.data.length < 1) {
      this.setServices()
    } else {
      this.$store.dispatch('SET_PAYMENT_INFO', {
        payment_info: {
          name: '',
          rut: '',
          email: '',
          movil: '',
          completeName: ''
        }
      })
      this.$store.dispatch('DELETE_ALL_SEAT')
      this.$store.dispatch('SET_STEP', { step: 1 })
    }
  },
  methods: {
    setServices() {
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
