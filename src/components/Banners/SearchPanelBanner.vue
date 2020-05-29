<template>
  <v-carousel
    cycle
    hide-delimiters
    :show-arrows="false"
    class="rounded-home-banner promotion-banner_container banner-home-fadeIn"
    height="auto"
    v-if="showBanner"
  >
    <v-carousel-item v-for="(item, i) in homeBanners.data" :key="i">
      <v-card color="white" style="color: black;" :min-height="height">
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-img :height="height" :src="item.urlImagen" width="280"></v-img>
          <div
            class="text-center d-flex justify-center align-center flex-column"
            style="width: 100%"
          >
            <slot name="promotion">
              <p class="headline d-block">{{ item.titulo }}</p>
              <p class="body-2 px-3">
                {{ item.contenido }}
              </p>
              <p
                class="headline px-3"
                :style="{ backgroundColor: item.fondoTarifa }"
                style="border-radius: 10px"
              >
                <span :style="{ color: item.colorTarifa }"
                  >${{ item.tarifas }}</span
                >
              </p>
            </slot>
          </div>
        </div>
      </v-card>
    </v-carousel-item>
  </v-carousel>
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
  computed: {
    ...mapState(['homeBanners']),
    showBanner() {
      return this.homeBanners.data.length > 0 && !this.homeBanners.loading
    }
  }
}
</script>
<style>
.rounded-home-banner {
  border-radius: 30px !important;
  border-bottom-left-radius: 30px !important;
  border-bottom-right-radius: 30px !important;
  overflow: hidden;
}

.promotion-banner_container {
  position: absolute;
  margin-left: 4rem;
}

.banner-home-fadeIn {
  animation: banner-home-fadeIn 0.5s cubic-bezier(0.87, 0, 0.13, 1);
  top: 100px;
  left: 0;
  opacity: 1;
  width: 500px;
}

@keyframes banner-home-fadeIn {
  0% {
    top: 400px;
    left: 600px;
    opacity: 0;
    width: 100px;
  }
  100% {
    top: 100px;
    left: 0;
    opacity: 1;
    width: 500px;
  }
}
</style>
