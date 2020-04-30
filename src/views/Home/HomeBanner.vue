<template>
  <v-carousel cycle hide-delimiters :show-arrows="false" height="50vh">
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
        src: 'banner_1.jpg'
      },
      {
        src: 'banner_2.jpg'
      },
      {
        src: 'banner_3.jpg'
      },
      {
        src: 'banner_4.jpg'
      }
    ]
  })
}
</script>
