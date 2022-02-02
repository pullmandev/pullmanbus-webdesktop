<template>
  <NewsList
    :title="$t('home_text.travels.title')"
    :subTitle="$t('home_text.travels.sub')"
    :items="test_data"
    color="blue_light3"
    secondColor="white"
    icon="mdi-bus-side"
    titleStyle="font-family: 'Satisfy-Regular'; font-size: 3rem;"
    subTitleStyle="font-family: 'Satisfy-Regular'; font-size: 2rem; color: #6b9cfb !important;"
  />
</template>

<script>
import NewsList from '@/components/NewsList'

export default {
  components: {
    NewsList
  },

  data() {
    return {
      articles: [],
      test_data: [
        {
          img: 'img_viajando_1.png',
          link: '',
          title: 'IQUIQUE',
          content: 'Descubre el encanto de Iquique, recorre Cavancha y su intensa vida.'
        },
        {
          img: 'img_viajando_2.png',
          link: '',
          title: 'ANGELMÓ',
          content:
            'Ven a conocer el mercado de Angelmó y disfruta de sus delicias marinas.'
        },
        {
          img: 'img_viajando_4.png',
          link: '',
          title: 'FRAY JORGE',
          content:
            'En la región de Coquimbo este parque te invita a recorrer sus senderos.'
        },
        {
          img: 'img_viajando_4.png',
          link: '',
          title: 'CHILLÁN',
          content:
            'Te invitamos a conocer los encantos de la capital de la región del Nuble.'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .VueCarousel-slide .v-icon {
  transform: rotateY(180deg);
}
</style>
