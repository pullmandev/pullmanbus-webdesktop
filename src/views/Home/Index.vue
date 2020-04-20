<template>
  <div class="home">
    <SearchPanel />
    <DestiniesTypes />
    <PopularDestinies />
    <Promotions class="mb-12" />
    <RecentArticles />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchPanel from '@/views/Home/SearchPanel'
import DestiniesTypes from '@/views/Home/DestiniesTypes'
import PopularDestinies from '@/views/Home/PopularDestinies'
import RecentArticles from '@/views/Home/RecentArticles'
import Promotions from '@/components/PromotionBanner'

export default {
  name: 'Home',
  components: {
    SearchPanel,
    DestiniesTypes,
    PopularDestinies,
    RecentArticles,
    Promotions
  }
}
</script>
