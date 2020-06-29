<template>
  <div>
    <div :class="applyTitleStyle ? 'bannerTitle' : ''">
      <h3
        class="display-3 text-center blue_dark--text"
        style="font-family: 'Satisfy-Regular' !important; font-size: 3rem !important;"
      >
        Viajando por Chile
      </h3>
      <h4
        class="headline text-center satisfyFont blue_light--text"
        style="font-family: 'Satisfy-Regular' !important; font-size: 2rem !important;"
      >
        Conoce lugares, especies, eventos, comida y personajes de nuestro largo
        y hermoso país.
      </h4>
    </div>
    <v-img src="../../../static/images/home/Fondo.png">
      <BannerImageList
        :itemTitle="[
          'Flora y Fauna',
          'Chilenos notables',
          'Destinos',
          'Mambos nacioanles',
          'Picadas para el bajón'
        ]"
        :itemContent="[
          'Conoce Frutillar',
          'Álvaro López',
          'Maravillate con Temuco',
          'Infórmate sobre el 18/Sept',
          'Las mejores recetas'
        ]"
        :links="[
          'http://blog.pullmanbus.cl/?cat=26',
          'http://blog.pullmanbus.cl/?cat=27',
          'http://blog.pullmanbus.cl/?cat=28',
          'http://blog.pullmanbus.cl/?cat=29',
          'http://blog.pullmanbus.cl/?cat=30'
        ]"
        :images="[
          'article1.png',
          'article2.jpg',
          'article3.png',
          'article4.jpg',
          'article5.jpg'
        ]"
      />
    </v-img>
  </div>
</template>
<script>
import BannerImageList from '@/components/BannerImageBKGList'
export default {
  components: {
    BannerImageList
  },
  computed: {
    applyTitleStyle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
        case 'md':
          return false
        default:
          return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.imageBackground {
  background-image: url('../../../static/images/home/Fondo.png') !important;
}
.bannerTitle {
  margin-bottom: -65px;
}
</style>
