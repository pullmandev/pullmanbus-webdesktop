<template>
  <div>
    <Promotions height="270" :banner="true">
      <template slot="promotion">
        <p class="headline d-block">Aprovecha las promociones</p>
        <p class="display-2">Hasta 40% de descuento</p>
      </template>
    </Promotions>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid>
          <v-row column class="confirmation-title">
            <v-col cols="12" md="12" lg="12">
              <h1 class="blue_dark--text">Lo sentimos</h1>
            </v-col>
            <v-col cols="12" md="12" lg="12">
              <p>Confirmacion rechazada</p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div
                class="page-icon text-center d-flex align-center justify-center"
              >
                <v-icon size="70" class="white--text">clear</v-icon>
              </div>
            </v-col>
            <v-col cols="12" md="6" offset-md="3">
              <div class="text-center">
                <h3 class="mb-2 headline">{{ data.resultado.mensaje }}</h3>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-btn class="white--text mt-5 blue_dark" @click="$router.go(-1)">{{
        $t('back')
      }}</v-btn>
    </v-container>
  </div>
</template>
<script>
import Promotions from '@/components/PromotionBanner'
export default {
  props: ['data'],
  components: {
    Promotions
  }
}
</script>
<style scoped>
.page-icon {
  border-radius: 50%;
  width: 125px;
  height: 125px;
  background-color: var(--var-orange);
}
ol li {
  color: #a0a0a0;
}
.center {
  margin-top: 8vh !important;
}
.confirmation-title h1 {
  text-align: center;
  font-weight: bold !important;
}
.confirmation-title h1 {
  line-height: 4rem !important;
  font-size: 44px;
}
.confirmation-title p {
  font-size: 20px;
  color: #a0a0a0;
  text-align: center;
}
table {
  width: 100%;
  background-color: lightgray;
}
table td {
  color: grey;
  text-align: center;
}
</style>
