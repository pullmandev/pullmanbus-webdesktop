<template>
  <v-carousel cycle hide-delimiters :show-arrows="false" height="100vh">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="require(`../../static/images/${item.src}`)"
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
