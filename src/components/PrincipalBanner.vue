<template>
  <v-container :fluid="true" :px-0="true" class="d-flex justify-center">
    <v-card dark max-height="400" max-width="1400">
      <v-img :src="imagen" :height="height"></v-img>
    </v-card>
  </v-container>
</template>
<script>
import API from '@/services/api/parameters'
export default {
  data: () => ({
    imagen: ''
  }),
  props: {
    height: {
      type: [Number, String],
      default: 400
    },
    banner: Boolean
  },
  async mounted() {
    let params = { portal: { id: 7 }, portalSeccion: { id: '3' } }
    const response = await API.getContenidoSeccion(params)
    const data = response.data
    console.log(data)
    data.forEach(item => {
      if (item.llave == 'BANNER') this.imagen = item.imagen
    })
  }
}
</script>
<style scoped>
.null-radius {
  border-radius: 0 !important;
}
</style>
