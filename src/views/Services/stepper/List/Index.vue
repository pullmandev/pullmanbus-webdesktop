<template>
  <v-row>
    <v-col cols="12" xs="12" sm="12">
      <div class="mt-1 service-container-background">
        <v-container class="xim-desktop">
          <v-toolbar dark color="blue_light" id="serviceToolbar">
            <v-toolbar-title>
              <span class="title" :class="{ 'body-1': windowSize.x <= 960 }">
                {{ $t('outbound_service') }}: {{ searching.from_city.nombre }}
                {{ $t('to') }}
                {{ searching.to_city.nombre }}
              </span>
              <span class="title ml-3" :class="{ 'body-1': windowSize.x <= 960 }">
                <template v-if="selectedTab === 'tab-Vuelta' && hasVuelta">
                  Fecha de vuelta: {{ formatDate(searching.to_date) }}
                </template>
                <template v-else>
                  Fecha de ida: {{ formatDate(searching.from_date) }}
                </template>
              </span>
            </v-toolbar-title>
            <template v-if="hasVuelta" v-slot:extension>
              <v-tabs v-model="selectedTab" centered hide-slider>
                <v-tab
                  v-for="i in tabs"
                  :key="i"
                  :href="'#tab-' + i"
                  class="pa-0 tab-custom"
                  v-ripple="{ class: 'blue_dark--text' }"
                  active-class="tab-active"
                >
                  <v-btn
                    style="width: 100%; height: 100%;"
                    text
                    class="ma-0"
                    color="blue_light"
                    tile
                  >
                    <span class="white--text">
                      {{ i }}
                    </span>
                  </v-btn>
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <template v-if="hasVuelta">
            <v-tabs-items v-model="selectedTab" class="light">
              <v-tab-item value="tab-Ida">
                <List :back="false" />
              </v-tab-item>
              <v-tab-item value="tab-Vuelta">
                <List :back="true" />
              </v-tab-item>
            </v-tabs-items>
          </template>

          <List v-else :back="false" />
        </v-container>
        <v-container class="xim-movile mt-menos">
          <div class="xim-container-movile2">
            <v-row>
              <v-col cols="12" class="h-l">
                <span class="xim-label2"
                  >{{ $t('outbound_service') }}: {{ searching.from_city.nombre }} -
                  {{ searching.to_city.nombre }}</span
                >
                <template v-if="selectedTab === 'tab-Vuelta' && hasVuelta">
                  <span class="xim-label2"
                    >Fecha de vuelta: {{ formatDate(searching.to_date) }}</span
                  >
                </template>
                <template v-else>
                  <span class="xim-label2"
                    >Fecha de ida: {{ formatDate(searching.from_date) }}</span
                  >
                </template>
              </v-col>
            </v-row>
          </div>
          <!-- <v-toolbar dark color="blue_light" id="serviceToolbar"> -->

          <template v-if="hasVuelta" v-slot:extension>
            <v-tabs v-model="selectedTab" centered hide-slider>
              <v-tab
                v-for="i in tabs"
                :key="i"
                :href="'#tab-' + i"
                class="pa-0 tab-custom"
                v-ripple="{ class: 'blue_dark--text' }"
                active-class="tab-active"
              >
                <v-btn
                  style="width: 100%; height: 100%;"
                  text
                  class="ma-0"
                  color="blue_light"
                  tile
                >
                  <span class="white--text">
                    {{ i }}
                  </span>
                </v-btn>
              </v-tab>
            </v-tabs>
          </template>
          <!-- </v-toolbar> -->

          <template v-if="hasVuelta">
            <v-tabs-items v-model="selectedTab" class="light">
              <v-tab-item value="tab-Ida">
                <List :back="false" />
              </v-tab-item>
              <v-tab-item value="tab-Vuelta">
                <List :back="true" />
              </v-tab-item>
            </v-tabs-items>
          </template>

          <List v-else :back="false" />
        </v-container>
      </div>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable */
import List from '@/views/Services/stepper/List/ElementList'
import scrollAnimation from '@/helpers/scrollAnimation'
import { mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'

export default {
  components: {
    List
  },
  data() {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      //Button
      tabs: ['Ida', 'Vuelta']
    }
  },
  mounted() {
    this.$store.dispatch('SET_SERVICE_TAB', { tab: 'tab-Ida' })
    scrollAnimation('#paymentStepper')
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    ...mapGetters({
      services: ['getServiceList'],
      searching: ['getSearching'],
      hasVuelta: ['hasVuelta']
    }),
    selectedTab: {
      get() {
        return this.$store.state.services.tab
      },
      set(tab) {
        this.$store.dispatch('SET_SERVICE_TAB', { tab })
      }
    },
    langSearch() {
      return this.$t('search')
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('LL')
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
  }
}
</script>

<style lang="scss">
.font {
  font-family: Poppins;
}
.tab-custom {
  border: 0.5px solid lightgray;
  border-bottom: 0;
}

.tab-active {
  background: var(--var-blue_dark);
}

.icon-service-expanded {
  transform: rotate(90deg);
}

.icon-service {
  color: var(--var-red);
  font-size: 30px;
}

.service-company-image {
  margin-top: 20px;
  width: 100%;
  height: auto;
  max-width: 150px;
  max-height: 100px;
}

@media (max-width: 1060px) {
  .service-company-image {
    width: 100px;
    height: 25px;
  }
  .stepper__content {
    padding: 0px !important;
  }
}

@media (max-width: 1060px) {
  .service-company-image {
    width: 60px;
    height: 15px;
  }
  .expansion-panel__header {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
.service-item {
  margin-top: 10px;
  padding-top: 0;
  padding-bottom: 0;
}

.service-container-background {
  background-color: var(--var-light) !important;
}

.blue-dark {
  background-color: var(--var-dark-blue);
}

.noServices {
  min-height: 25vh;
}
.arrow .expansion-panel__header .icon {
  color: rgba(63, 12, 182, 0.54);
  font-size: 60px;
}

.arrow .expansion-panel__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  height: 110px;
}

.card__text {
  padding: 2px !important;
  width: 100%;
}

.result h1,
h2,
h3 {
  font-weight: 300 !important;
}

.datatable-container {
  background-color: white;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.15), 0 1px 10px 0 rgba(0, 0, 0, 0.15),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.datatable thead th.column.sortable {
  cursor: pointer;
}

/* estilo Bus */
.border-bus {
  border-bottom: 0px solid gray;
  border-top: 0px solid gray;
}

.min-h-30 {
  min-height: 30px;
}

.maxHeightLayout {
  max-height: 55vh;
  min-height: 55vh;
  overflow-y: scroll;
}
/* tamañp de grilla */
.flex.xs1 {
  -ms-flex-preferred-size: 4.333333333333332% !important;
  flex-basis: 4.333333333333332% !important;
  max-width: 4.333333333333332% !important;
}

/* . estilo Bus */
</style>
