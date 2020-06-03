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
      <h3 class="capitalize blue--text my-4">{{ agency.nombre }}</h3>
      <ul v-for="(item, i) in data" :key="i" class="my-4">
        <li>Descripcion: {{ item.Descripcion }}</li>
        <li>Direccion: {{ item.Direccion }}</li>
        <li>Telefono: {{ item.Fono }}</li>
        <li>Agente: {{ item.Agente }}</li>
      </ul>
    </v-container>
    <div style="height: 50vh;"></div>
  </section>
</template>
<script>
import API from '@/services/api/agencias'
export default {
  props: ['agency'],
  data() {
    return { loading: false, data: [] }
  },
  mounted() {
    this.$parent.$data.title = this.agency.nombre
    this.$parent.scrollToTop()
    this.loading = true
    API.getAgencies(this.agency.codigo)
      .then(response => {
        this.data = response.data
      })
      .catch(err => console.error(err))
      .finally(() => (this.loading = false))
  }
}
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
</style>
