<template>
  <div class="home" id="idHome">
    <SearchPanel />
    <PopularDestinies />
    <Banner class="my-6" />
    <RecentArticles />
    <v-row>
      <v-col cols="6" class="d-flex justify-center">
        <div
          class="fb-page my-12"
          data-href="https://www.facebook.com/pullman.cl/"
          data-tabs="timeline"
          data-width=""
          data-height=""
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite="https://www.facebook.com/pullman.cl/"
            class="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/pullman.cl/">Pullman Bus</a>
          </blockquote>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchPanel from '@/views/Home/SearchPanel/Index'
import PopularDestinies from '@/views/Home/PopularDestinies'
import RecentArticles from '@/views/Home/RecentArticles'
import Banner from '@/views/Home/HomeBanner'
import scrollAnimation from '@/helpers/scrollAnimation'

export default {
  name: 'Home',
  components: {
    SearchPanel,
    PopularDestinies,
    RecentArticles,
    Banner
  },
  mounted() {
    this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {
      date: null
    })
    this.$store.dispatch('SET_NEW_USER_SEARCHING_CITY', {
      date: null
    })
    this.$store.dispatch('SET_NEW_USER_SEARCHING_CITY', {
      direction: 'from',
      date: null
    })
    scrollAnimation('#idHome')
  }
}
</script>
<style lang="scss" scoped>
.fb-page {
  width: 300px;
}
</style>
