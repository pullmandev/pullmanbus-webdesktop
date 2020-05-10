<template>
  <v-carousel cycle hide-delimiters :show-arrows="false" :height="imageHeight">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="require(`../../../static/images/home/${item.src}`)"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        src: '1-2.jpg'
      },
      {
        src: '2-2.jpg'
      },
      {
        src: '3-2.jpg'
      }
    ]
  }),
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 150
        case 'sm':
        case 'md':
          return 300
        default:
          return '57vh'
      }
    }
  }
}
</script>
