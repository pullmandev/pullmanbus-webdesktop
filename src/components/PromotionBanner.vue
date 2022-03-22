<template>
  <v-container :fluid="banner" :px-0="banner">
    <v-card color="blue_dark" dark :class="{ 'null-radius': banner }">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div
          class="text-center d-flex justify-center align-center flex-column"
          style="width: 100%"
        >
          <slot name="promotion">
            <p class="headline">Aprovecha las promociones</p>
            <p class="display-2">Hasta 40% de descuento</p>
            <v-btn dark color="orange_dark ma-3">
              Más info.
            </v-btn>
            <p class="body-2">Aplican terminos y condiciones</p>
          </slot>
        </div>
        <div class="xim-responsivo">
          <v-img
            src="../../static/images/Imagen-descuento.png"
            class="xim-img-resposivo"
          ></v-img>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    height: {
      type: [Number, String],
      default: 400
    },
    banner: Boolean
  },
  data: () => ({
    src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
    title: 'Supermodel',
    artist: 'Foster the People'
  })
}
</script>
<style scoped>
.null-radius {
  border-radius: 0 !important;
}
</style>
