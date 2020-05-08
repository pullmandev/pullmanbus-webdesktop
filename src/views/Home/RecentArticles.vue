<template>
  <BannerImageList
    title="Artículos recientes"
    subTitle="Infórmate sobre las últimas noticias relacionadas"
    :itemTitles="[
      'Túnel sanitizador - Ministra, Gloria Hutt, informó iniciativa a cargo de empresa Pullman',
      'Hermanos Bolivianos - PullmanBus dispone de buses para ciudadanos bolivianos',
      'Pullman Bus comprometido con sus clientes - Buses de todos sus servicios garantizando un viaje seguro'
    ]"
    :links="[
            'https://www.24horas.cl/coronavirus/pullman-inaugura-tunel-sanitizador-en-terminal-de-buses-de-estacion-central-4103664',
    'https://www.cooperativa.cl/noticias/sociedad/salud/coronavirus/bolivianos-varados-ya-comenzaron-a-viajar-hacia-iquique-para-retornar-a/2020-04-29/002450.html',
    'https://www.24horas.cl/coronavirus/pullman-inaugura-tunel-sanitizador-en-terminal-de-buses-de-estacion-central-4103664']"
    :images="['Noticia1-1.png', 'Noticia2-1.png', 'Noticia3-1.png']"
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
