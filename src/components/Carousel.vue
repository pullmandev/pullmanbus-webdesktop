<template>
  <div style="min-height: 630px; height: 100vh">
    <v-carousel cycle hide-delimiters :show-arrows="false" height="100%">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="require(`../../static/images/${item.src}`)"
        transition="fade-carousel"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        src : 'Slide02.png'
      },
      {
        src: 'Slide01.png'
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
