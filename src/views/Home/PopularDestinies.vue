<template>
  <BannerImageList
    title=""
    subTitle=""
    :itemTitles="['Viaja en Bus, la manera más inteligente de viajar', 'Obtén aquí tu Pullman Pass', 'Conoce aquí los convenios que Pullman Bus tiene para tí']"
    :images="['Imagen-viajaenbus.png', 'bus.png','Imagen-convenios.png']"
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
