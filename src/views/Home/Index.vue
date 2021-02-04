<template>
  <div class="home" id="idHome">
    <SearchPanel />
    <PopularDestinies />
    <Banner class="my-6" />
    <RecentArticles />
    <SocialMedia />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchPanel from '@/views/Home/SearchPanel/Index'
import PopularDestinies from '@/views/Home/PopularDestinies'
import RecentArticles from '@/views/Home/RecentArticles'
import SocialMedia from '@/views/Home/SocialMedia/Index'
import Banner from '@/views/Home/HomeBanner'
import scrollAnimation from '@/helpers/scrollAnimation'

export default {
  name: 'Home',
  components: {
    SearchPanel,
    PopularDestinies,
    RecentArticles,
    SocialMedia,
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
