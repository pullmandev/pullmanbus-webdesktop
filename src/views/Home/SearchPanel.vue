<template>
  <div style="position: relative;">
    <Carousel />
    <v-container class="search_container">
      <div class="margin-search" />
      <v-card color="orange" class="elevation-24 rounded-search-box mt-5">
        <v-row justify="center">
          <v-col cols="6">
            <v-radio-group dark v-model="row" row class="search-panel-radios">
              <v-radio color="blue_dark" label="Ida" value="ida"></v-radio>
              <v-radio
                color="blue_dark"
                label="Vuelta"
                value="vuelta"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="2" sm="12" offset-md="1">
            <cities-list direction="from" />
          </v-col>
          <v-col md="2" sm="12">
            <cities-list direction="to" />
          </v-col>
          <v-col md="2" sm="12" class="pt-2">
            <calendar :fromHome="true" direction="from" />
          </v-col>
          <v-col md="2" sm="12" class="pt-2">
            <calendar :fromHome="true" direction="to" />
          </v-col>
          <v-col md="2" sm="12">
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

.rounded-search-box {
  border-radius: 10px !important;
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
