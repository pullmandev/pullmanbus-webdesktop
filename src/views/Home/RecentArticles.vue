<template>
  <div>
    <div :class="applyTitleStyle ? 'bannerTitle' : ''">
      <h3
        class="display-3 text-center"
        style="font-family: 'Satisfy-Regular' !important; color: var(--var-blue_dark); font-size: 3rem !important;"
      >
        Artículos recientes
      </h3>
      <h4
        class="headline text-center satisfyFont"
        style="font-family: 'Satisfy-Regular' !important; color: var(--var-blue_light); font-size: 2rem !important;"
      >
        Infórmate sobre las últimas noticias relacionadas
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
          'Te compartimos las mejores recetas'
        ]"
        :links="[
          'https://www.24horas.cl/coronavirus/pullman-inaugura-tunel-sanitizador-en-terminal-de-buses-de-estacion-central-4103664',
          'https://www.cooperativa.cl/noticias/sociedad/salud/coronavirus/bolivianos-varados-ya-comenzaron-a-viajar-hacia-iquique-para-retornar-a/2020-04-29/002450.html',
          'https://www.24horas.cl/coronavirus/pullman-inaugura-tunel-sanitizador-en-terminal-de-buses-de-estacion-central-4103664',
          'https://www.24horas.cl/coronavirus/pullman-inaugura-tunel-sanitizador-en-terminal-de-buses-de-estacion-central-4103664',
          'https://www.24horas.cl/coronavirus/pullman-inaugura-tunel-sanitizador-en-terminal-de-buses-de-estacion-central-4103664'
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
