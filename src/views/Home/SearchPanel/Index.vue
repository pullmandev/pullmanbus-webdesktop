<template>
  <div style="position: relative;">
    <Carousel />
    <Promotions class="displayNoneSm" v-if="toCity != null" />
    <v-container fluid class="search_container xim-movil-position">
      <div class="searchcontent" :style="{ marginTop: breakPoint.margin }" />
      <v-card color="light" class="elevation-24 rounded-search-box px-12 pb-10">
        <v-card-text class="px-0">
          <v-row class="searcherheader">
            <v-col cols="6" class="py-0">
              <h2
                style="font-size: 1.5rem !important;"
                class="blue_dark--text"
                :class="breakPoint.fontClass"
              >
                {{ $t('travel_details') }}
              </h2>
            </v-col>
            <v-col cols="6" class="py-0">
              <div class="petshcontainer" style="display: flex; flex-direction: row; justify-content: flex-end">
                <v-switch
                  class="switch-pet"
                  v-model="petService"
                  color="blue_dark"
                  hide-details
                ></v-switch>
                <div class="petshcontent">
                  <v-icon
                    style="border-radius: 50%; vertical-align: center;"
                    class="orange_dark pa-1"
                    color="white"
                    >mdi-paw</v-icon
                  >
                  <span style="vertical-align: center" class="blue_dark--text ml-1">{{
                    $t('home_text.pets')
                  }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-row>
          <v-col class="pb-0 city" style="padding-top: 4px" cols="12" sm="5" md>
            <cities-from-list
              direction="from"
              v-model="fromCity"
              :windowHeight="windowSize.y"
              :fromHome="true"
            />
          </v-col>
          <v-col
            md="1"
            sm="2"
            cols="12"
            class="pa-0 d-flex justify-center align-center exchange"
          >
            <v-btn icon color="blue" @click="exchangeCities">
              <img
                src="../../../../static/logos/menu/icono_ida_vuelta.svg"
                alt="change_icon"
                width="28"
                height="28"
              />
            </v-btn>
          </v-col>
          <v-col class="pb-0 city" style="padding-top: 4px" cols="12" sm="5" md>
            <cities-to-list
              direction="to"
              v-model="toCity"
              :windowHeight="windowSize.y"
              :fromHome="true"
            />
          </v-col>
          <v-col class="py-0" cols="12" sm="6" md>
            <calendar direction="from" v-model="fromDate" />
          </v-col>
          <v-col class="py-0" sm="6" md>
            <calendar direction="to" v-model="toDate" :fromDate="fromDate" />
          </v-col>
          <v-col cols="12" md="2" style=" display: flex; justify-content: center;">
            <div style="max-width: 150px;">
              <v-btn
                block
                class="white--text rounded-search"
                style="margin: auto"
                color="orange_dark"
                @click="validateSearch"
                :disabled="loadingServices"
              >
                <v-icon style="font-size: 31px; opacity: 0.6;" left dark
                  >mdi-magnify</v-icon
                >
                <span>{{ $t('search') }}</span>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import Promotions from '@/components/Banners/SearchPanelBanner'
import CitiesFromList from '@/views/Home/SearchPanel/CitiesFrom'
import CitiesToList from '@/views/Home/SearchPanel/CitiesTo'
import Calendar from '@/views/Home/SearchPanel/Calendar'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    Carousel,
    CitiesFromList,
    CitiesToList,
    Calendar,
    Promotions
  },
  data: () => ({
    fromDate: null,
    toDate: null,
    fromCity: null,
    toCity: null,
    windowSize: { x: window.innerWidth, y: window.innerHeight },
    petService: false
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
            margin: '60vh',
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
      let searchingCity = value.codigo
      this.$store.dispatch('LOAD_CITIES_TO_LIST', {
        searchingCity
      })
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
      if (this.fromCity == null) {
        this.$notify({
          group: 'error',
          title: this.$t('select_origin'),
          type: 'error'
        })
        return
      }
      if (this.toCity == null) {
        this.$notify({
          group: 'error',
          title: this.$t('select_destination'),
          type: 'error'
        })
        return
      }
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
        toCity: this.toCity,
        petService: this.petService
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
      this.$store.dispatch('SET_NEW_USER_SEARCHING_PET', {
        petService: this.petService
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

<style lang="scss">
@import '@/sass/colors.scss';

.margin-search {
  margin-top: 50vh;
}

@media (max-width: 960px) {
  .margin-search {
    margin-top: 100px;
  }
}

@media (min-width: 960px) {
  .col-md-1.exchange {
    flex: 0 0 3%;
    max-width: 3%;
  }
}

@media (max-width: 960px){
  .searcherheader{
    flex-direction: column;
  }
  .searchcontent{
    margin-top: auto !important;
  }
  .py-0{
    max-width: 100% !important;
  }
  .blue_dark--text{
    text-align: center;
  }
  .petshcontainer{
    display: flex;
    flex-direction: column !important;
    align-items: center;
  }
  .petshcontent{
    text-align: center;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  .col-sm-2.exchange {
    flex: 0 0 4%;
    max-width: 4%;
  }
  .col-sm-5.city {
    flex: 0 0 48%;
    max-width: 48%;
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
  max-width: 1300px;
  .v-input--switch__thumb {
    color: $blue_dark !important;
  }
}

@media (max-width: 960px){
  .search_container{
    position: inherit;
  }
  .xim-movil-position {
    margin: 0% 0 0 0;
  }
}

.search-panel-radios .v-input--radio-group__input {
  justify-content: center;
}
.img-filtro {
  max-height: 32px;
}
.switch-pet {
  margin-top: 0px !important;
}

@media (max-width: 576px) {
  .xim-movil-position {
    margin: 0% 0 0 0;
  }
}
</style>
