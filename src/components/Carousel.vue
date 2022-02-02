<template>
  <div class="bannercont">
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
    let params
    if(this.$vuetify.breakpoint.name == 'xs' || this.$vuetify.breakpoint.name == 'sm'){
      params = { "portal": { "id": 5 }, "portalSeccion": { "id": "2" } }
    } else {
      params = { "portal": { "id": 7 }, "portalSeccion": { "id": "2" } }
    }
    const response = await API.getContenidoSeccion(params)
    const data = response.data
    console.log(data)
    data.forEach(item => {
      this.items.push({"src": item.imagen})
    });

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
.bannercont{
  min-height: 630px;
  height: 100vh;
}
@media (max-width: 960px  ){
  .bannercont{
    min-height: auto;
    height: auto;
  }
}
@media (max-width: 576px) {
.bannercont{
    margin-top: 14%;
    min-height: auto;
    height: auto;
  }
}
</style>
