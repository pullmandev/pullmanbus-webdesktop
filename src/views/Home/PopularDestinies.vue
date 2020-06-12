<template>
  <BannerImageList
    title="Temas de interés"
    subTitle="Infórmate sobre nuestros servicios, convenios y otros"
    :items="articles"
  />
</template>
<script>
import BannerImageList from '@/components/NewsList'
import API from '@/services/api/posts'
export default {
  components: {
    BannerImageList
  },
  data() {
    return {
      articles: []
    }
  },
  async mounted() {
    const response = await API.getPosts()
    response.data.forEach(item => {
      API.getImage(item._links['wp:featuredmedia'][0].href).then(response => {
        const img = response.data.media_details.sizes.medium_large.source_url
        this.articles.push({
          title: item.title.rendered,
          content: item.excerpt.rendered,
          link: item.link,
          img
        })
      })
    })
  }
}
</script>
