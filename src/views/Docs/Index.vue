<template>
  <div id="docs">
    <v-img
      src="../../../static/images/Slide1.png"
      class="d-flex justify-center align-center text-center white--text"
    >
      <h1>{{ $t(title) }}</h1>
    </v-img>
    <router-view></router-view>
  </div>
</template>
<script>
import scrollAnimation from '@/helpers/scrollAnimation'

export default {
  data() {
    return {
      title: ''
    }
  },
  methods: {
    scrollToTop() {
      scrollAnimation('#docs')
    }
  }
}
</script>
<style scoped>
.ProfileBackground {
  background: var(--var-light);
  min-height: 95vh;
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>
