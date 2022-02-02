<template>
  <div id="agencies" class="py-12">
    <img
      src="../../../static/images/form_banners/banner_viajes.png"
      alt="banner-confirmacion"
      style="width: 100%"
    />
    <regions />
    <detail v-if="region != null" />
  </div>
</template>
<script>
import Regions from './List'
import Detail from './Detail'
import scrollAnimation from '@/helpers/scrollAnimation'
export default {
  components: {
    Regions,
    Detail
  },
  watch: {
    region() {
      this.$nextTick(() => {
        scrollAnimation('#agencyListContainer')
      })
    }
  },
  data() {
    return { region: null }
  },
  mounted() {
    this.scrollToTop()
  },
  methods: {
    scrollToTop() {
      scrollAnimation('#agencies')
    }
  }
}
</script>
