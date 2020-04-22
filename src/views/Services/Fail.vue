<template>
  <div>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid grid-list-lg>
          <v-layout column class="confirmation-title">
            <v-flex xs12 md12 lg12>
              <h1>Lo sentimos</h1>
            </v-flex>
            <v-flex xs12 md12 lg12>
              <p>Orden de compra {{ $route.params.id }} rechazada</p>
            </v-flex>
            <v-flex xs12 class="container-icon">
              <div class="page-icon text-xs-center pt-2">
                <v-icon>clear</v-icon>
              </div>
            </v-flex>
            <v-flex xs12 md6 offset-md3>
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
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn
        style="background-color:#a0a0a0;"
        class="white--text mt-5"
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
.container-icon {
  display: flex;
  justify-content: center;
}
.page-icon {
  border-radius: 50%;
  width: 125px;
  height: 125px;
  background-color: var(--var-light-blue);
}
.page-icon .icon {
  color: white;
  font-size: 100px;
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
  color: #8dcae2;
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
