<template>
  <BannerImageList
    title="Destinos populares"
    subTitle="Ver todos los destinos"
    :itemTitles="['Valparaiso', 'Angol', 'Copiapó']"
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
