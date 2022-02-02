<template>
  <div class="home" id="idHome">
    <SearchPanel />
    <PopularDestinies />
    <Travels />
    <!-- <Banner class="my-6" /> -->
    <!-- <RecentArticles /> -->
    <SocialMedia />
  </div>
</template>

<script>
import SearchPanel from '@/views/Home/SearchPanel/Index'
import PopularDestinies from '@/views/Home/PopularDestinies'
import Travels from '@/views/Home/Travels'
import SocialMedia from '@/views/Home/SocialMedia/Index'
import scrollAnimation from '@/helpers/scrollAnimation'
// import RecentArticles from '@/views/Home/RecentArticles'
// import Banner from '@/views/Home/HomeBanner'

export default {
  name: 'Home',

  components: {
    SearchPanel,
    PopularDestinies,
    Travels,
    SocialMedia
    // RecentArticles,
    // Banner
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
    this.$store.dispatch('SET_USER_COUPON', {
      userCoupon: {active: false}
    })
    scrollAnimation('#idHome')
  }
}
</script>
