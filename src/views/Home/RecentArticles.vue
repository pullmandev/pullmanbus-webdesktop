<template>
  <div>
    <div :class="applyTitleStyle ? 'bannerTitle' : ''">
      <h3
        class="display-3 text-center blue_dark--text"
        style="font-family: 'Satisfy-Regular' !important; font-size: 3rem !important;"
      >
        Artículos recientes
      </h3>
      <h4
        class="headline text-center satisfyFont blue_light--text"
        style="font-family: 'Satisfy-Regular' !important; font-size: 2rem !important;"
      >
        Infórmate sobre las últimas noticias relacionadas
      </h4>
    </div>
    <v-img src="../../../static/images/home/Fondo.png">
      <BannerImageList :items="articles" />
    </v-img>
  </div>
</template>
<script>
import BannerImageList from '@/components/ArticleList'
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
  computed: {
    applyTitleStyle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
        case 'md':
          return false
        default:
          return true
      }
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
<style lang="scss" scoped>
.imageBackground {
  background-image: url('../../../static/images/home/Fondo.png') !important;
}
.bannerTitle {
  margin-bottom: -65px;
}
</style>
