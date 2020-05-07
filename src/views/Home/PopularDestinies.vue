<template>
  <BannerImageList
    title="Temas de interés"
    subTitle="Servicios, convenios y otros"
    :itemTitles="['Viaja en Bus, la manera más inteligente de viajar', 'Obtén aquí tu Pullman Pass y accede a un mundo de descuentos', 'Conoce aquí los convenios que Pullman Bus tiene para tí']"
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
