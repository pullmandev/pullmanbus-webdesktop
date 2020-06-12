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
    console.log('data', response.data)
    response.data
      .filter(item => {
        const id = 31
        let result = false
        for (let category of item.categories) {
          if (category === id) {
            result = true
            break
          }
        }
        return result
      })
      .forEach(item => {
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
