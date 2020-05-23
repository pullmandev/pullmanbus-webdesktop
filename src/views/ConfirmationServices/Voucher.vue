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
            <v-col cols="12" class="d-flex justify-center">
              <div style="max-width: 600px" class="text-center">
                <p>
                  Su compra ha sido realizada con éxito, se ha enviado un mail a
                  su correo con el comprobante de compra
                </p>
              </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-card
                dark
                max-width="400"
                class="elevation-0 rounded"
                color="orange"
              >
                <v-card-text class="pt-6 text-center">
                  <h3 class="white--text headline">
                    Visualizar detalle de boleto
                  </h3>
                  <a class="white--text body-1" @click="gettingTickets"
                    >Haz click aqui</a
                  >
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
import API from '@/services/api/confirmationTicket'
import Promotions from '@/components/PromotionBanner'
export default {
  components: {
    Promotions
  },
  methods: {
    gettingTickets() {
      this.$notify({
        group: 'load',
        title: this.$t('get_ticket'),
        type: 'info'
      })
      API.confirmTicket({
        boleto: 'INT00073721',
        clase: 'SAL08',
        empresa: '01',
        asiento: '4',
        idServicio: 'BU547',
        fechaServicio: '20200524',
        fechaSalida: '202005240830',
        idOrigen: 'MA',
        idDestino: 'D3',
        piso: '1',
        email: 'romulocg25@gmail.com'
      })
        .then(response => {
          const data = response.data
          console.log(data)
          if (!data.resultado.exito) {
            this.$notify({
              group: 'error',
              title: data.resultado.mensaje,
              type: 'error'
            })
            return
          }
          this.toPDF(data.archivo)
        })
        .catch(err => {
          console.error(err)
        })
    },
    toPDF(response) {
      // create a download anchor tag
      const tipo = response.tipo.toLowerCase()
      let downloadLink = document.createElement('a')
      downloadLink.target = '_blank'
      downloadLink.download = response.nombre

      // convert downloaded data to a Blob
      const blob = new Blob([this.toUint8Array(response.archivo)], {
        type: `application/${tipo}`
      })

      // create an object URL from the Blob
      let URL = window.URL || window.webkitURL
      const downloadUrl = URL.createObjectURL(blob)

      // set object URL as the anchor's href
      downloadLink.href = downloadUrl

      // append the anchor to document body
      document.body.append(downloadLink)

      // fire a click event on the anchor
      downloadLink.click()

      // cleanup: remove element and revoke object URL
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(downloadUrl)
    },
    toUint8Array(archivo) {
      const binary = atob(archivo)
      const length = binary.length
      const arrayBuffer = new ArrayBuffer(length)
      const uintArray = new Uint8Array(arrayBuffer)

      for (let i = 0; i < length; i++) {
        uintArray[i] = binary.charCodeAt(i)
      }

      return uintArray
    }
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
