<template>
  <fragment>
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
  </fragment>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  mounted() {
    this.createMarks()
  },

  methods: {
    createMarks() {
      const agenciesWithCoordinates = this.data.filter(agencie =>
        this.isPosition(agencie)
      )

      agenciesWithCoordinates.forEach(async (agencie, i) => {
        const map = await this.$refs.mapRef[i].$mapPromise
        map.panTo(this.position(agencie))
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
