<template>
  <BannerImageList
    title="Artículos recientes"
    subTitle="Ingresa a nuestro blog"
    :itemTitles="[
      '',
      '',
      ''
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
