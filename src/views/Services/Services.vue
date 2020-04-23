<template>
  <v-row>
    <v-col cols="2" class="pl-9 pr-0">
      <search-panel class="displayNoneSm"></search-panel>
      <filters class="displayNoneSm" />
    </v-col>
    <v-col cols="10">
      <stepper step="1" ref="stepper" />
    </v-col>
  </v-row>
</template>
<script>
import SearchPanel from '@/views/Services/searchPanel'
import Filters from '@/views/Services/filters/Index'
import Stepper from '@/views/Services/stepper/Index'
export default {
  components: {
    SearchPanel,
    Filters,
    Stepper
  },
  mounted() {
    const { fromFail } = localStorage
    if (fromFail || this.$route.query.fromLogin) {
      localStorage.removeItem('fromFail')
    } else if (this.$store.state.services.data.length < 1) {
      this.$store.dispatch('LOAD_SERVICES_LIST')
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
  }
}
</script>
