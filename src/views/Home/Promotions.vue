<template>
  <v-container>
    <v-card color="blue_dark" dark>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div
          class="text-center d-flex justify-center align-center flex-column"
          style="width: 100%"
        >
          <p class="headline d-block">Aprovecha las promociones</p>
          <p class="display-2">Hasta 40% de descuento</p>
          <v-btn dark color="orange_dark ma-3">
            Más info.
          </v-btn>
          <p class="body-2">Aplican terminos y condiciones</p>
        </div>
        <div style="width: 500px">
          <v-img
            src="../../../static/images/Imagen-descuento.png"
            height="400"
          ></v-img>
        </div>
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
    title: 'Supermodel',
    artist: 'Foster the People'
  })
}
</script>
