<template>
  <BannerImageList
    title="Temas de interés"
    subTitle="Infórmate sobre nuestros servicios, convenios y otros"
    :itemTitles="['Viaja en Bus, la manera más inteligente de viajar', 'Obtén aquí tu Pullman Pass y accede a un mundo de descuentos', 'Conoce aquí los convenios que Pullman Bus tiene para tí']"
    :links="['https://www.viajaenbus.cl/','https://www.pullmanbus.cl/portalWAR/paginas/contenido/pass.jsf','https://www.pullmanbus.cl/portalWAR/paginas/contenido/convenio.jsf#header']"
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
