<template>
  <div class="home" id="idHome">
    <SearchPanel />
    <PopularDestinies />
    <Banner class="mb-12" />
    <RecentArticles />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchPanel from '@/views/Home/SearchPanel'
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
    scrollAnimation('#idHome')
  }
}
</script>
