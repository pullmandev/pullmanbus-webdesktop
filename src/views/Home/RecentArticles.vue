<template>
  <BannerImageList
    title="Articulos recientes"
    subTitle="Ingresa a nuestro blog"
    :itemTitles="[
      'Turismo este 2020',
      '¿Cuándo viajar?',
      'Los buses más seguros'
    ]"
    :images="['Copiapó.jpg', 'Angol.jpg', 'Valparaiso.jpg']"
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
