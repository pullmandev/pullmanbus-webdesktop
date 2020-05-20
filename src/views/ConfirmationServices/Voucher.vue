<template>
  <div>
    <Promotions height="270" :banner="true">
      <template slot="promotion">
        <p class="headline d-block">Aprovecha las promociones</p>
        <p class="display-2">Hasta 40% de descuento</p>
      </template>
    </Promotions>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5 elevation-0">
        <v-container fluid>
          <v-row class="confirmation-title blue_dark--text">
            <v-col cols="12" md="12" lg="12">
              <h1>{{ $t('congratulations') }}</h1>
            </v-col>
            <v-col cols="12" class="text-center">
              <p>Su compra ha sido realizada con éxito</p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-card
                dark
                max-width="400"
                class="elevation-0 rounded"
                color="orange"
              >
                <v-card-text>
                  <p class="white--text">
                    Para viasualizar la informacion de su boleto por confirmar
                    ve a la barra de informacion
                  </p>
                  <p class="white--text">o</p>
                  <p><a class="blue_dark--text">Haz click aqui</a></p>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div
                class="page-icon text-center d-flex align-center justify-center"
              >
                <v-icon size="70" class="white--text">check</v-icon>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import Promotions from '@/components/PromotionBanner'
export default {
  components: {
    Promotions
  }
}
</script>
<style scoped>
.rounded {
  border-radius: 10px !important;
  overflow: hidden;
}
.page-icon {
  border-radius: 50%;
  width: 90px;
  height: 90px;
  background-color: var(--var-orange);
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
