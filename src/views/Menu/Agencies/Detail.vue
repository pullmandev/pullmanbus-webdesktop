<template>
  <section class="container">
    <div v-if="loading" class="text-center pt-12">
      <v-progress-circular
        indeterminate
        :size="100"
        color="blue"
      ></v-progress-circular>
    </div>
    <v-container v-else>
      <v-row>
        <v-col>
          <div style="max-height: 400px; overflowY: scroll">
            <div v-for="(item, i) in data" :key="i" class="my-4">
              <h3 class="capitalize blue--text mt-4 mb-3">
                {{ item.Descripcion }}
              </h3>
              <ul>
                <li>Direccion: {{ item.Direccion }}</li>
                <li>Telefono: {{ item.Fono }}</li>
                <li>Agente: {{ item.Agente }}</li>
              </ul>
              <v-btn
                text
                color="orange"
                class="mt-2"
                style="font-size: 0.6rem"
                @click="updateMap(item.Latitud, item.Longitud)"
              >
                <v-icon>mdi-map-search</v-icon>
                Ver en mapa
              </v-btn>
            </div>
          </div>
          <v-btn class="white--text mt-5 blue_dark" @click="$router.go(-1)">{{
            $t('back')
          }}</v-btn>
        </v-col>
        <v-col>
          <gmap-map
            :center="{ lat: 10, lng: 10 }"
            :zoom="7"
            map-type-id="terrain"
            style="width: 500px; height: 300px"
            ref="mapRef"
          >
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center = m.position"
            />
          </gmap-map>
        </v-col>
      </v-row>
    </v-container>
    <div style="height: 50vh;"></div>
  </section>
</template>
<script>
import API from '@/services/api/agencias'
export default {
  props: ['agency'],
  data() {
    return {
      loading: false,
      data: [],
      markers: [],
      markerSelected: {}
    }
  },
  mounted() {
    this.$parent.$data.title = this.agency.nombre
    this.$parent.scrollToTop()
    this.loading = true
    API.getAgencies(this.agency.codigo)
      .then(response => {
        this.data = response.data
        this.data.forEach(item => {
          this.markers.push({
            position: {
              lat: parseInt(item.Latitud),
              lng: parseInt(item.Longitud)
            }
          })
        })
        const firstMarker = this.markers[0].position
        setTimeout(() => {
          this.updateMap(firstMarker.lat, firstMarker.lng)
        }, 500)
      })
      .catch(err => console.error(err))
      .finally(() => (this.loading = false))
  },
  methods: {
    updateMap(latitud, longitud) {
      const lat = parseInt(latitud)
      const lng = parseInt(longitud)
      console.log(this.$refs)
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo({ lat, lng })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
</style>
