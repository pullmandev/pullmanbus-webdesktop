<template>
  <div class="ProfileBackground" id="profile" >
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: ''
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
