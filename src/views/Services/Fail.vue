<template>
  <div>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid>
          <v-row column class="confirmation-title">
            <v-col cols="12" md="12" lg="12">
              <h1 class="blue_dark--text">Lo sentimos</h1>
            </v-col>
            <v-col cols="12" md="12" lg="12">
              <p>Orden de compra {{ $route.params.id }} rechazada</p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div
                class="page-icon text-center d-flex align-center justify-center"
              >
                <v-icon size="70" class="white--text">clear</v-icon>
              </div>
            </v-col>
            <v-col cols="12" md="6" offset-md="3">
              <div class="ml-5">
                <h3 class="mb-2">Las posibles causas de este rechazo son:</h3>
                <ol class="ml-4">
                  <li>
                    Error en el ingreso de los datos de su tarjeta de Crédito o
                    Débito (fecha y/o código de seguridad).
                  </li>
                  <li>
                    Su tarjeta de Crédito o Débito no cuenta con saldo
                    suficiente.
                  </li>
                  <li>
                    Tarjeta aún no habilitada en el sistema financiero.
                  </li>
                </ol>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-btn
        class="white--text mt-5 blue_dark"
        @click="toServices"
        v-lang.back
      ></v-btn>
    </v-container>
  </div>
</template>
<script>
export default {
  methods: {
    toServices() {
      localStorage.fromFail = true
      this.$router.push({ path: '/services' })
    }
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
