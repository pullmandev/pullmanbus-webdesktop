<template>
  <div>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid>
          <v-row class="confirmation-title blue_dark--text">
            <v-col cols="12" md="12" lg="12">
              <h1 v-lang.congratulations></h1>
            </v-col>
            <v-col cols="12" md="12" lg="12">
              <p v-lang.success_buy></p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div
                class="page-icon text-center d-flex align-center justify-center"
              >
                <v-icon size="70" class="white--text">check</v-icon>
              </div>
            </v-col>
            <v-col cols="12" md="12" lg="12">
              <h3 class="mb-2">Datos de la compra:</h3>
              <v-data-table
                :headers="headers"
                :items="[data]"
                hide-actions
                class="elevation-1"
              >
                <template slot="item" slot-scope="props">
                  <td class="text-left">{{ $route.params.id }}</td>
                  <td class="text-left">Pullman bus</td>
                  <td class="text-left">Peso Chileno</td>
                  <td class="text-left">
                    {{ props.item.montoFormateado }}
                  </td>
                  <td class="text-center">
                    {{ props.item.codigoTransbank }}
                  </td>
                  <td class="text-left">{{ fechaFormateada }}</td>
                  <td class="text-left">
                    {{ props.item.tipoPagoFormateado }}
                  </td>
                  <td class="text-left">{{ props.item.numeroCuota }}</td>
                  <td class="text-left">{{ props.item.numeroTarjeta }}</td>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-btn
        color="blue_dark"
        class="white--text mt-5"
        @click="$router.push({ path: '/' })"
        v-lang.back
      ></v-btn>
    </v-container>
  </div>
</template>
<script>
import API from '@/services/api/transaction'
import moment from 'moment'

export default {
  data() {
    return {
      data: {},
      headers: [
        { text: 'Orden de Compra', sortable: false },
        { text: 'Comercio', sortable: false },
        { text: 'Moneda', sortable: false },
        { text: 'Monto', sortable: false },
        { text: 'Código Transacción', sortable: false },
        { text: 'Fecha', sortable: false },
        { text: 'Tipo de pago', sortable: false },
        { text: 'Cuotas', sortable: false },
        { text: 'N. Tarjeta', sortable: false }
      ]
    }
  },
  mounted() {
    this.$notify({
      group: 'load',
      title: this.translate('get_ticket'),
      type: 'info'
    })
    const codigo = this.$route.params.id
    API.postHeader({ orden: codigo }).then(response => {
      this.data = response.data
      const boletos = this.data.boletos
      boletos.forEach(async item => {
        const response = await API.postVoucher({
          boleto: item.boleto,
          codigo
        })
        this.toPDF(response.data)
      })
    })
  },
  computed: {
    fechaFormateada() {
      console.log(this.language)
      moment.locale(this.language)
      return moment(this.data.fechaCompra).format('L')
    }
  },
  methods: {
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
.page-icon {
  border-radius: 50%;
  width: 125px;
  height: 125px;
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
