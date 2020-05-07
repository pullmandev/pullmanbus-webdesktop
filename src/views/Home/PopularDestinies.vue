<template>
  <BannerImageList
    title="Enlaces"
    subTitle="Accede a información de interés"
    :itemTitles="['Valparaiso', 'Angol', 'Copiapó']"
    :images="['Imagen-convenios.png', 'bus.png', 'Imagen-viajaenbus.png']"
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
