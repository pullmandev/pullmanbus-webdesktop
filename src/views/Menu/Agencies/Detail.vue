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
          <div style="max-height: 400px; overflowY: scroll" id="agencyList">
            <div v-for="(item, i) in data" :key="i" style="width: 100%">
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
              <v-divider v-if="i < data.length - 1"></v-divider>
            </div>
          </div>
        </v-col>
        <v-col class="d-flex justify-center">
          <gmap-map
            :center="{ lat: 10, lng: 10 }"
            :zoom="12"
            map-type-id="terrain"
            style="width: 600px; height: 400px"
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
      <v-btn class="white--text mt-5 blue_dark" @click="$router.go(-1)">{{
        $t('back')
      }}</v-btn>
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
              lat: parseFloat(item.Latitud),
              lng: parseFloat(item.Longitud)
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
      const lat = parseFloat(latitud)
      const lng = parseFloat(longitud)
      //console.log(this.$refs)
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo({ lat, lng })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/sass/mixins.scss';

@include track('#agencyList');
@include scrollbar('#agencyList');
@include thumb('#agencyList');

li {
  list-style: none;
}
</style>
