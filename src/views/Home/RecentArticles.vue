<template>
  <BannerImageList
    title="Articulos recientes"
    subTitle="Ingresa a nuestro blog"
    :itemTitles="[
      'Turismo este 2020',
      '¿Cuándo viajar?',
      'Los buses más seguros'
    ]"
    :images="['Copiapó2.jpg', 'Cuando viajar.jpg', 'Los buses más seguros.jpg']"
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
