<template>
  <div style="position: relative;">
    <Carousel />
    <v-container class="search_container">
      <div class="margin-search" />
      <v-card
        color="orange"
        class="elevation-24 rounded-search-box mt-5 px-12 pt-7"
      >
        <v-card-text class="px-0"
          ><h2 class="display-1 white--text" v-lang.travel_details></h2
        ></v-card-text>
        <v-row>
          <v-col md="6" sm="12" class="py-0">
            <cities-list direction="from" />
          </v-col>
          <v-col md="6" sm="12" class="py-0">
            <cities-list direction="to" />
          </v-col>
          <v-col md="6" sm="12" class="py-0">
            <calendar :fromHome="true" direction="from" />
          </v-col>
          <v-col md="6" sm="12" class="py-0">
            <calendar :fromHome="true" direction="to" />
          </v-col>
          <v-col md="4" sm="12" offset-md="4">
            <v-btn
              block
              class="white--text rounded-search"
              color="blue_dark"
              @click="validateSearch"
              :disabled="loadingServices"
            >
              <span v-lang.search></span>
            </v-btn>
          </v-col>
          <v-col md="1" />
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import CitiesList from '@/components/Cities'
import Calendar from '@/components/Calendar'
import { mapGetters } from 'vuex'

export default {
  components: {
    Carousel,
    CitiesList,
    Calendar
  },
  data: () => ({
    row: null
  }),
  methods: {
    validateSearch() {
      this.$notify({
        group: 'stuck-load',
        title: this.translate('search_services'),
        type: 'info'
      })
      const { fromFail } = localStorage
      if (fromFail) {
        localStorage.removeItem('fromFail')
      }
      this.$store.dispatch('LOAD_SERVICES_LIST')
    }
  },
  computed: mapGetters({
    loadingServices: ['getLoadingService']
  }),
  mounted() {
    this.$store.dispatch('LOAD_CITIES_LIST')
  }
}
</script>

<style>
.margin-search {
  margin-top: 50vh;
}

@media (max-width: 960px) {
  .margin-search {
    margin-top: 40vh;
  }
}

@media (max-width: 960px) and (orientation: landscape) {
  .margin-search {
    margin-top: 100vh;
  }
}
.center_layout {
  z-index: 2;
}

div.card.search_card {
  background-color: #194e8edd !important;
  color: #fff;
}

.search_container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.search-panel-radios .v-input--radio-group__input {
  justify-content: center;
}
</style>
