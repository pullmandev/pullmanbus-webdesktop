<template>
  <OptionCoupon />
</template>
<script>
import OptionCoupon from '@/views/CouponServices/Validate/OptionCoupon'

export default {
  components: {
    OptionCoupon
  },
  data() {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      automatic: true
    }
  },
  mounted() {},
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {}
}
</script>

<style lang="scss"></style>
