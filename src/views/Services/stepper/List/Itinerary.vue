<template>
  <div>
    <v-dialog v-model="itinerary" persistent max-width="700">
      <!-- Card date passenger -->

      <v-card class="elevation-1 rounded-search-box">
        <v-toolbar color="orange" class="white--text elevation-0">
          <v-toolbar-title>
            <h2 class="text-center title">
              Itinerario
            </h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="itinerary = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="text-center">
          <v-progress-circular
            v-if="loading"
            indeterminate
            :size="100"
            color="blue"
          ></v-progress-circular>
          <v-row v-else>
            <v-col>
              <span class="subtitle-1">Ciudad</span>
              <span
                class="body-1 d-block"
                :class="{
                  'orange--text textMatch subtitle-1':
                    city.cityId === searching.from_city.codigo ||
                    city.cityId === searching.to_city.codigo
                }"
                v-for="(city, i) in cities"
                :key="i"
                >{{ city.name }}</span
              >
            </v-col>
            <v-col>
              <span class="subtitle-1">Terminal</span>
              <span
                class="body-1 d-block"
                :class="{
                  'orange--text textMatch subtitle-1':
                    terminal.cityId === searching.from_city.codigo ||
                    terminal.cityId === searching.to_city.codigo
                }"
                v-for="(terminal, i) in terminals"
                :key="i"
                >{{ terminal.name }}</span
              >
            </v-col>
            <v-col>
              <span class="subtitle-1">Hora Salida</span>
              <span
                class="body-1 d-block"
                :class="{
                  'orange--text textMatch subtitle-1':
                    hour.cityId === searching.from_city.codigo ||
                    hour.cityId === searching.to_city.codigo
                }"
                v-for="(hour, i) in hours"
                :key="i"
                >{{ hour.name }}</span
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text class="text-center">
          <v-icon color="orange">mdi-help-circle</v-icon> Los horarios son
          aproximados, pueden sufrir variaciones
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import API from '@/services/api/parameters'

export default {
  props: ['service', 'open'],
  data() {
    return {
      loading: false,
      cities: [],
      terminals: [],
      hours: []
    }
  },
  computed: {
    ...mapGetters({
      searching: ['getSearching']
    }),
    itinerary: {
      get() {
        return this.open
      },
      set(value) {
        this.$emit('update:open', value)
      }
    }
  },
  watch: {
    service() {
      this.loading = true
      API.getItinerario(this.service.idServicio)
        .then(response => {
          response.data.forEach(item => {
            this.cities.push({ name: item.ciudadSalida, cityId: item.idCiudad })
            this.terminals.push({
              name: item.terminalSalida,
              cityId: item.idCiudad
            })
            this.hours.push({
              name: `${item.horaSalida.substr(0, 2)}:${item.horaSalida.substr(
                2,
                2
              )}`,
              cityId: item.idCiudad
            })
          })
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>
<style scoped>
.textMatch {
  font-weight: bold !important;
}
</style>
