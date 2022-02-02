<template>
  <div class="CouponBackground">
    <router-view></router-view>
  </div>
</template>
<script>
/* eslint-disable */
import Promotions from '@/components/PromotionBanner'
import { mapGetters } from 'vuex'

export default {
  name: "Services",
  components: {
    Promotions
  },
  data () {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight }
    }
  },
  computed: mapGetters({
    resume: ['show_resume'],
    userData: ['userData']
  }),
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style>
.floating-resume-btn {
  position: fixed !important;
  bottom: 0;
  right: 0;
  margin: 3rem !important;
  z-index: 5;
}
.floating-search-btn {
  position: fixed !important;
  bottom: 0;
  left: 0;
  margin: 3rem !important;
  z-index: 5;
}
.floating-filters-btn {
  position: fixed !important;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 3rem auto !important;
  z-index: 5;
}
.firstBanner {
  width: 100%;
}

.CouponBackground {
  min-width: 100%;
  min-height: 95vh;
  background-image: url('../../../static/images/bgCuponera.png');
  background-size: cover;
  background-repeat: no-repeat; 
  
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
