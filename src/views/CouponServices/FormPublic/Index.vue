<template>
  <!-- <div class="CouponBackground"> -->
    <!-- Principal View -->
    <!-- <div style="margin-top: 52px"></div> -->
    <FormPublic />
    <!-- <div style="height: 150px; background: var(--var-light);"></div> -->
  <!-- </div> -->
</template>
<script>
/* eslint-disable */
import FormPublic from "@/views/CouponServices/FormPublic/FormPublic";

export default {
  components: {
    FormPublic
  },
  data() {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      automatic: true
    };
  },
  mounted () {
  },
  beforeDestroy () { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {
  }
};
</script>

<style lang="scss">
.CouponBackground {
  background: var(--var-light);
  min-height: 95vh;
  
}
</style>
