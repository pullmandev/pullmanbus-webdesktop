<template>
  <div style="min-height: 630px; height: 100vh">
    <v-carousel cycle hide-delimiters :show-arrows="false" height="100%">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
        transition="fade-carousel"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import API from '@/services/api/parameters'
export default {
  data: () => ({
    items: []
  }),
  async mounted() {
    const response = await API.getListaCarrusel() 
    const data = response.data   
    data.forEach(item => {
      this.items.push({"src": item.imagen})
    });
    console.log(this.items)
  }
}
</script>
<style lang="scss" scoped>
.fade-carousel {
  &-leave-active {
    position: absolute;
    left: 0;
    right: 0;
  }
  &-enter-active,
  &-leave-active {
    transition: 3s ease-out !important;
  }
  &-enter,
  &-leave,
  &-leave-to {
    opacity: 0 !important;
  }
}
</style>
