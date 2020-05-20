<template>
  <v-card color="white" style="width: 500px" class="rounded">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div style="width: 200px">
        <v-img
          src="../../../static/images/Imagen-descuento.png"
          :height="height"
        ></v-img>
      </div>
      <div
        class="text-center d-flex justify-center align-center flex-column"
        style="width: 100%"
      >
        <slot name="promotion">
          <p class="headline d-block">Promocion</p>
          <p class="body-1 px-3">
            Compra tu pasaje por confirmar a un precio preferente
          </p>
        </slot>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    height: {
      type: [Number, String],
      default: 200
    },
    banner: Boolean
  },
  data: () => ({
    src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'
  })
}
</script>
<style scoped>
.rounded {
  border-radius: 40px !important;
  overflow: hidden;
}
</style>
