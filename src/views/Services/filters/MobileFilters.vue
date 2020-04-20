<template>
  <div>
    <div style="margin-top: 56px"></div>
    <v-card class="pb-2">
      <v-toolbar dark class="primarylight">
        <v-toolbar-title>Filtros</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <div class="mt-5">
          <by-time />
          <by-price />
          <by-company />
          <by-service />
        </div>
      </v-card-text>
    </v-card>
    <div class="menu pb-2">
      <v-layout>
        <v-flex xs6 sm3>
          <v-btn flat color="primary" class="backText" @click="$router.back()">
            <v-icon>keyboard_arrow_left</v-icon>
            Regresar
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import byPrice from './ByPrice'
import byTime from './ByTime'
import byCompany from '@/views/services/filters/byCompany'
import byService from '@/views/services/filters/ByService'
export default {
  components: {
    byPrice,
    byTime,
    byCompany,
    byService
  }
}
</script>
<style scoped>
.backText {
  font-size: 18px;
}
.menu {
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: white;
}
</style>
