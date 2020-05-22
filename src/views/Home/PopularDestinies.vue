<template>
  <BannerImageList
    title="Temas de interés"
    subTitle="Infórmate sobre nuestros servicios, convenios y otros"
    :itemTitle="[
      'Pullman Bus en Teletrece',
      'Instalaión túnel sanatizador',
      'Tecnologías de Pullman Bus para pasajes y terminales',
      'Hermanos Bolivianos'
    ]"
    :itemContent="[
      'Pullman bus comprometidos con sus clientes - Buses de todos sus servicios garantizando un viaje seguro',
      'Túnel sanitizador. Ministra Florida Hutt, informó iniciativa a cargo de empresa Pullman',
      'Debido a la contingencia nacional del Covid-19, Pullman Bus te invita a conversar con Tío Pullman.',
      'Hermanos Bolivianos, Pullman Bus dispone de buses para ciudadanos bolivianos'
    ]"
    :links="[
      'https://www.viajaenbus.cl/',
      'https://www.pullmanbus.cl/portalWAR/paginas/contenido/pass.jsf',
      'https://www.pullmanbus.cl/portalWAR/paginas/contenido/convenio.jsf#header',
      'https://www.pullmanbus.cl/portalWAR/paginas/contenido/convenio.jsf#header'
    ]"
    :images="[
      'Noticia1-1.png',
      'Noticia3-1.png',
      'Tecnologia-Tio-Pullman.jpg',
      'Noticia2-1.png'
    ]"
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
