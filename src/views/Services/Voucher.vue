<template>
  <div>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid grid-list-lg>
          <v-layout column class="confirmation-title">
            <v-flex xs12 md12 lg12>
              <h1 v-lang.congratulations></h1>
            </v-flex>
            <v-flex xs12 md12 lg12>
              <p v-lang.success_buy></p>
            </v-flex>
            <v-flex xs12 md12 lg12>
              <v-card-media
                src="/static/imgs/background/Confirmación-pago.png"
                height="125px"
                contain
              ></v-card-media>
            </v-flex>
            <v-flex xs12 md12 lg12>
              <h3 class="mb-2">Datos de la compra:</h3>
              <v-data-table
                :headers="headers"
                :items="[data]"
                hide-actions
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-right">{{ $route.params.id }}</td>
                  <td class="text-xs-right">Viajaenbus</td>
                  <td class="text-xs-right">Peso Chileno</td>
                  <td class="text-xs-right">
                    {{ props.item.montoFormateado }}
                  </td>
                  <td class="text-xs-center">
                    {{ props.item.codigoTransbank }}
                  </td>
                  <td class="text-xs-right">{{ fechaFormateada }}</td>
                  <td class="text-xs-right">
                    {{ props.item.tipoPagoFormateado }}
                  </td>
                  <td class="text-xs-right">{{ props.item.numeroCuota }}</td>
                  <td class="text-xs-right">{{ props.item.numeroTarjeta }}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-btn
        style="background-color:#a0a0a0;"
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
