<template>
  <div>
    <v-row cols="12" sm="12" md="8" lg="6">
      <v-col>
        <div class="mt-1 service-container-background">
          <v-toolbar dark color="blue_light" id="serviceToolbar">
            <v-toolbar-title>
              <span class="title" :class="{ 'body-1': windowSize.x <= 960 }">
                {{ translate('outbound_service') }}:
                {{ searching.from_city.nombre }} {{ translate('to') }}
                {{ searching.to_city.nombre }}
              </span>
            </v-toolbar-title>
            <template v-if="hasVuelta" v-slot:extension>
              <v-tabs v-model="selectedTab" centered slider-color="yellow">
                <v-tab
                  v-for="i in tabs"
                  :key="i"
                  :href="'#tab-' + i"
                  class="pa-0 tabButton"
                >
                  <v-btn
                    style="width: 100%; height: 100%;"
                    class="ma-0"
                    :class="i === 'Ida' ? 'mr-1' : 'ml-1'"
                    color="blue_light"
                    text
                    @click="selectedTab = i"
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
                <List />
              </v-tab-item>
              <v-tab-item value="tab-Vuelta">
                <List :back="true" />
              </v-tab-item>
            </v-tabs-items>
          </template>
          <List v-else :back="false" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable */
import List from "@/views/Services/stepper/List/ElementList";
import { mapGetters } from "vuex";
import moment from "moment";
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
    };
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy () { 
    window.removeEventListener('resize', this.onResize); 
  },
  computed: {
    ...mapGetters({
      services: ['getServiceList'],
      searching: ['getSearching']
    }),
    hasVuelta () {
      const services = this.services(true)
      return services.length > 0
    },
    selectedTab: {
      get () {
        return this.$store.state.services.tab
      },
      set (tab) {
        this.$store.dispatch('SET_SERVICE_TAB', {tab})
      }
    },
    active () {
      return 'tab-' + this.selectedTab
    },
    langSearch () {
      return this.translate('search')
    }
  },
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    }
  }
};
</script>

<style >
.tabButton a{
  padding-left: 0 !important;
  padding-right: 0 !important;
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
  width: 200px;
  height: 50px;
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


.result h1, h2, h3 {
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
