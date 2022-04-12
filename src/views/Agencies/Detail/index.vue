<template>
  <v-container id="agencyListContainer">
    <v-toolbar color="blue_light2" class="toolbar-radius white--text  mb-3" dense>
      <region-icon class="detail-icon" :code="$parent.region.code" />
      <v-toolbar-title>
        <h2 class="text-left title" style="line-height: 20px">
          {{ $parent.region.name }}
        </h2>
      </v-toolbar-title>
    </v-toolbar>
    <v-card :color="agencies.length > 0 ? 'white' : 'background_blue'">
      <v-container fluid class="py-0">
        <v-row class="pa-0" v-if="agencies.length > 0">
          <v-col id="agencyList" cols="3" class="background_blue px-0 panel">
            <ul class="px-0 blue_light--text">
              <li
                class="py-1 pl-5"
                :class="{
                  selected: selected != null && selected.codigo === item.codigo
                }"
                v-for="(item, i) of agencies"
                :key="i"
                @click="selectAgency(item)"
              >
                {{ item.nombre }}
              </li>
            </ul>
          </v-col>
          <v-col id="mapList" cols="9" class="panel">
            <div v-if="loading || selected == null" class="text-center pt-12">
              <v-progress-circular
                indeterminate
                :size="100"
                color="blue_light2"
              ></v-progress-circular>
            </div>
            <template v-else>
                  <div v-for="(item, i) in data" :key="i" style="width: 100%">
                    <v-row ref="row">
                      <v-col cols="8">

                        <h3 class="capitalize blue--text mt-4 orange_dark--text">
                          <v-icon color="orange_dark">mdi-map-marker</v-icon>
                          {{ item.Descripcion }}
                        </h3>

                        <ul class="ml-1">
                          <li>Direccion: {{ item.Direccion }}</li>
                          <li>Telefono: {{ item.Fono }}</li>
                          <li>Agente: {{ item.Agente }}</li>
                        </ul>
                      </v-col>

                       <v-col cols="4">
                        <gmap-map
                          v-if="isPosition(item)"
                          :center="{ lat: 10, lng: 10 }"
                          :zoom="12"
                          map-type-id="roadmap"
                          style="width: auto; height: 160px"
                          ref="mapRef"
                        >
                          <gmap-marker
                            :position="position(item)"
                            :clickable="true"
                            :draggable="true"
                            @click="center = item.marker.position"
                          />
                        </gmap-map>

                        <div v-else>{{ $t('no_location') }}</div>
                      </v-col> 
                    </v-row>

                   <v-divider v-if="i < data.length - 1"></v-divider>
                  </div>
            </template>
          </v-col>
        </v-row>
        <div v-else class="no-cities-message">
          No hay agencias disponibles para esta region
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>
<script>
//import RegionIcon from '../RegionIcons'
import API from '@/services/api/agencias'
//import MapList from './MapList'
export default {
  components: {
    //MapList,
    //RegionIcon
  },
  data() {
    return {
      loading: true,
      selected: null,
      data: [],
    }
  },
  computed: {
    agencies() {
      const region = this.$parent.region
      return region != null ? region.cities : []
    }
  },
  watch: {
    agencies() {
      let agency = this.agencies[0]
      if (agency) this.selectAgency(agency)
    }
  },
  mounted() {
    this.selectAgency(this.agencies[0])
  },
  methods: {
    selectAgency(agency) {
      this.selected = agency
      this.getAgency()
    },
    getAgency() {
      this.data  = [];
      this.loading = true
      API.getAgencies(this.selected.codigo)
        .then(response => {
          const data = response.data
          this.data = data.map(item => {
            const marker = {
              position: {
                lat: parseInt(item.Latitud),
                lng: parseInt(item.Longitud)
              }
            }
            return { ...item, marker }
          })
        })
        .catch(err => console.error(err))
        .finally(() => {
          this.loading = false;
        })
    },
    position(agencie) {
      return {
        lat: parseFloat(agencie.Latitud),
        lng: parseFloat(agencie.Longitud)
      }
    },
    isPosition(agencie) {
      return agencie.Latitud !== '0' && agencie.Longitud !== '0'
    } 
  }
}
</script>
<style lang="scss" scoped src="./Detail.scss" />
<style lang="scss" scoped>
@import '@/sass/colors.scss';

h3 {
  line-height: 1.2;
}

li {
  list-style: none;
  color: $blue_light;
  line-height: 1.2;
}
</style>
