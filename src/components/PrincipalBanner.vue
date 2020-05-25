<template>
  <v-container :fluid="true" :px-0="true" class="d-flex justify-center">
    <v-card dark max-height="400" max-width="1400">
      <v-img
        src="../../static/images/PrincipalBanner.png"
        :height="height"
      ></v-img>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    height: {
      type: [Number, String],
      default: 400
    },
    banner: Boolean
  }
}
</script>
<style scoped>
.null-radius {
  border-radius: 0 !important;
}
</style>
