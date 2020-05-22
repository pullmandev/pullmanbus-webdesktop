<template>
  <v-carousel cycle hide-delimiters :show-arrows="false" height="100vh">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="require(`../../static/images/${item.src}`)"
      transition="fade-carousel"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        src: 'Slide1.png'
      },
      {
        src: 'Slide2.png'
      },
      {
        src: 'Slide3.png'
      }
    ]
  })
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
