<template>
  <div class="menuContainer">
    <v-container>
      <router-view></router-view>
    </v-container>
  </div>
</template>
<style lang="scss" scoped>
$padding: 100px;
.menuContainer {
  padding-top: $padding;
  padding-bottom: $padding;
  min-height: 100vh;
  background: var(--var-light);
}
</style>
