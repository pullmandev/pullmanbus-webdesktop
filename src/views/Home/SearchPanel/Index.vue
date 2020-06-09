<template>
  <div style="position: relative;">
    <Carousel />
    <Promotions class="displayNoneSm" v-if="toCity != null" />
    <v-container class="search_container">
      <div :style="{ marginTop: breakPoint.margin }" />
      <v-card
        color="orange"
        class="elevation-24 rounded-search-box mt-5 px-12 pt-7"
      >
        <v-card-text class="px-0"
          ><h2 class="display-1 white--text" :class="breakPoint.fontClass">
            {{ $t('travel_details') }}
          </h2></v-card-text
        >
        <v-row>
          <v-col cols="12" class="py-0">
            <v-row>
              <v-col class="py-0">
                <cities-list
                  direction="from"
                  v-model="fromCity"
                  :windowHeight="windowSize.y"
                />
              </v-col>
              <v-col
                md="1"
                cols="12"
                class="py-0 d-flex justify-center align-center"
              >
                <v-btn icon color="white" @click="exchangeCities">
                  <v-icon>sync_alt</v-icon>
                </v-btn>
              </v-col>
              <v-col class="py-0">
                <cities-list
                  direction="to"
                  v-model="toCity"
                  :windowHeight="windowSize.y"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col md="6" cols="12" class="py-0">
            <calendar direction="from" v-model="fromDate" />
          </v-col>
          <v-col md="6" cols="12" class="py-0">
            <calendar direction="to" v-model="toDate" :fromDate="fromDate" />
          </v-col>
          <v-col md="4" cols="12" offset-md="4">
            <v-btn
              block
              class="white--text rounded-search"
              color="blue_dark"
              @click="validateSearch"
              :disabled="loadingServices"
            >
              <span>{{ $t('search') }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import Promotions from '@/components/Banners/SearchPanelBanner'
import CitiesList from '@/views/Home/SearchPanel/Cities'
import Calendar from '@/views/Home/SearchPanel/Calendar'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    Carousel,
    CitiesList,
    Calendar,
    Promotions
  },
  data: () => ({
    fromDate: null,
    toDate: null,
    fromCity: null,
    toCity: null,
    windowSize: { x: window.innerWidth, y: window.innerHeight }
  }),
  computed: {
    ...mapGetters({
      loadingServices: ['getLoadingService'],
      searching: ['getSearching']
    }),
    breakPoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
        case 'xs':
          return {
            margin: '100px',
            fontClass: 'headline'
          }
        default:
          return {
            margin: '50vh',
            fontClass: 'display-1'
          }
      }
    }
  },
  watch: {
    fromDate(value) {
      const diff = moment(this.toDate).diff(value, 'days')
      if (diff <= -1 || value == null) {
        this.toDate = null
      }
      this.$store.dispatch('SET_HOME_BANNERS', {
        from_date: value,
        from_city: this.fromCity,
        to_city: this.toCity
      })
    },

    fromCity(value) {
      this.$store.dispatch('SET_HOME_BANNERS', {
        from_date: this.fromDate,
        from_city: value,
        toCity: this.toCity
      })
    },
    toCity(value) {
      this.$store.dispatch('SET_HOME_BANNERS', {
        from_date: this.fromDate,
        from_city: this.fromCity,
        to_city: value
      })
    }
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    exchangeCities() {
      const fromCity = this.fromCity
      this.fromCity = this.toCity
      this.toCity = fromCity
    },
    validateSearch() {
      this.$notify({
        group: 'stuck-load',
        title: this.$t('search_services'),
        type: 'info'
      })
      const { fromFail } = localStorage
      if (fromFail) {
        localStorage.removeItem('fromFail')
      }
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
    this.$store.dispatch('LOAD_CITIES_LIST')
    this.fromDate = moment()
      .format()
      .split(':')[0]
      .split('T')[0]
  }
}
</script>

<style>
.margin-search {
  margin-top: 50vh;
}

@media (max-width: 960px) {
  .margin-search {
    margin-top: 100px;
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
