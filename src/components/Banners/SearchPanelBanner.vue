<template>
  <v-card
    color="white"
    style="width: 500px"
    :min-height="height"
    class="rounded"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-img width="280" :src="homeBanners[0].urlImagen" cover></v-img>
      <div
        class="text-center d-flex justify-center align-center flex-column"
        style="width: 100%"
      >
        <slot name="promotion">
          <p class="headline d-block">{{ homeBanners[0].titulo }}</p>
          <p class="body-2 px-3">
            {{ homeBanners[0].contenido }}
          </p>
          <p
            class="headline px-3"
            :style="{ backgroundColor: homeBanners[0].fondoTarifa }"
            style="border-radius: 10px"
          >
            <span :style="{ color: homeBanners[0].colorTarifa }"
              >${{ homeBanners[0].tarifas }}</span
            >
          </p>
        </slot>
      </div>
    </div>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    height: {
      type: [Number, String],
      default: 180
    },
    banner: Boolean
  },
  created() {
    this.$store.dispatch('SET_HOME_BANNERS')
  },
  computed: mapState(['homeBanners'])
}
</script>
<style scoped>
.rounded {
  border-radius: 40px !important;
  overflow: hidden;
}
</style>
