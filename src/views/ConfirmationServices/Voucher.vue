<template>
  <div>
    <Promotions height="270" :banner="true">
      <template slot="promotion">
        <p class="headline d-block">Aprovecha las promociones</p>
        <p class="display-2">Hasta 40% de descuento</p>
      </template>
    </Promotions>
    <v-row>
      <v-col cols="12" sm="12" md="8" offset-md="2">
        <v-card class="mt-12">
          <v-toolbar
            dense
            class="elevation-0"
            dark
            color="blue_light"
            id="serviceToolbar"
          >
            <v-toolbar-title>
              <span class="title ml-3">
                Servicio por confirmar:
              </span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form v-model="validForm">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      filled
                      outlined
                      dense
                      v-model="email"
                      :rules="emailRules"
                      :label="$t('email')"
                      outline-1
                      color="blue"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      filled
                      outlined
                      dense
                      v-model="confirmemail"
                      :rules="emailconfirmRules"
                      :label="$t('confirm_email')"
                      @paste.prevent
                      outline-1
                      color="blue"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn
                      class="white--text"
                      :disabled="!validForm"
                      :loading="loadingTicket"
                      color="blue_dark"
                      @click="gettingTickets"
                    >
                      <span>Continuar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-container v-if="succeed" class="center" id="congrats">
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
import validations from '@/helpers/fieldsValidation'
import scrollAnimation from '@/helpers/scrollAnimation'

export default {
  components: {
    Promotions
  },
  data() {
    return {
      validForm: false,
      email: '',
      confirmemail: '',
      loadingTicket: false,
      generalRules: [v => !!v || 'Este campo es requerido'],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      emailconfirmRules: [
        v => (v && this.email === v) || 'E-mails no coinciden'
      ],
      succeed: false
    }
  },
  methods: {
    scrollAnimation,
    async gettingTickets() {
      try {
        if (!this.validForm) {
          this.$notify({
            group: 'error',
            title: 'Debe confirmar correo primero',
            type: 'error'
          })
          return
        }
        this.loadingTicket = true
        this.$notify({
          group: 'load',
          title: this.$t('get_ticket'),
          type: 'info'
        })
        const seat = this.$store.state.confirmationServices.seats[0]
        const ticket = this.$store.state.searchingConfirmation.ticket
        const fechaServicio = this.formatDate(seat.fechaServicio)
        const fechaSalida = this.formatDate(seat.fecha, seat.horaSalida)
        const response = await API.confirmTicket({
          boleto: ticket.boleto,
          clase: seat.clase,
          empresa: seat.empresa,
          asiento:
            seat.piso === 1
              ? (parseInt(seat.asiento) + 20).toString()
              : seat.asiento,
          idServicio: seat.servicio,
          fechaServicio,
          fechaSalida,
          idOrigen: seat.origen,
          idDestino: seat.destino,
          piso: seat.piso + 1,
          email: this.email
        })
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
        this.succeed = true
        setTimeout(() => {
          this.scrollAnimation('#congrats')
        }, 200)
        this.toPDF(data.archivo)
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingTicket = false
      }
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
    },
    formatDate(fecha, hour) {
      const fechaItems = fecha.split('/')
      let result = fechaItems[2] + fechaItems[1] + fechaItems[0]
      if (hour) {
        const formatedHour = hour.split(':').join('')
        result += formatedHour
      }
      console.log(result)
      return result
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
