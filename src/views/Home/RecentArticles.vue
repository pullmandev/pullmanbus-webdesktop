<template>
  <BannerImageList
    title="Articulos recientes"
    subTitle="Ingresa a nuestro blog"
    :itemTitles="[
      'Turismo este 2020',
      '¿Cuándo viajar?',
      'Los buses más seguros'
    ]"
    :images="['Noticia1.png', 'Noticia2.png', 'Noticia3.png']"
  />
</template>
<script>
import BannerImageList from '@/components/BannerImageList'
export default {
  components: {
    BannerImageList
  }
}
</script>
