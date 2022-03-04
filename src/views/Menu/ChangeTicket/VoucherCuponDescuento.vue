<template>
  <v-container class="center">
    <v-card class="elevation-10 pt-5 pb-5">
      <v-container fluid>
        <v-row class="confirmation-title blue_dark--text">
          <v-col cols="12" md="12" lg="12">
            <h1>{{ $t('congratulations') }}</h1>
          </v-col>

          <v-col cols="12" md="12" lg="12">
            <p>{{ $t('success_coupon_change') }}</p>
          </v-col>

          <v-col cols="12" class="d-flex justify-center">
            <div class="page-icon text-center d-flex align-center justify-center">
              <v-icon size="70" class="white--text">check</v-icon>
            </div>
          </v-col>

          <v-col cols="12" md="12" lg="12">
            <h3 class="mb-2 ml-2">Datos del cupón:</h3>
            <v-container>
              <div class="xim-desktop">
                <table id="tblTicket">
                  <tr class="content">
                    <td>N° Cupón</td>
                    <td>Fecha Activación</td>
                    <td>Email</td>
                    <td>Valor</td>
                  </tr>
                  <tr class="content">
                    <td>{{ ticketChange.voucher.boleto }}</td>
                    <td>{{ ticketChange.voucher.fechaActivacion }}</td>
                    <td>{{ ticketChange.voucher.email }}</td>
                    <td>{{ ticketChange.voucher.total }}</td>
                  </tr>
                </table>
              </div>
              <div class="xim-movile">
                <v-row class="xim-alinea-vertical" >
                  <v-col cols="6" class="xim-colum">
                    <label class="xim-texto-label">N° Cupón</label>
                    <span class="xim-texto-datos">{{ ticketChange.voucher.boleto }}</span>
                  </v-col>
                  <v-col cols="6" class="xim-colum">
                    <label class="xim-texto-label">Fecha Activación</label>
                    <span class="xim-texto-datos">{{ ticketChange.voucher.fechaActivacion }}</span>
                  </v-col>
                  <v-col cols="6" class="xim-colum">
                    <label class="xim-texto-label">Email</label>
                    <span class="xim-texto-datos">{{ ticketChange.voucher.email }}</span>
                  </v-col>
                  <v-col cols="6" class="xim-colum">
                    <label class="xim-texto-label">Valor</label>
                    <span class="xim-texto-datos">{{ ticketChange.voucher.total }}</span>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-col>
          <div class="xim-desktop">
            <v-col class="d-flex justify-end">
              <v-btn class="mt-5" outlined @click="toServices">
                {{ $t('back') }}
              </v-btn>

              <v-btn
                class="download white--text mt-5 ml-3"
                color="blue_dark"
                @click="download"
              >
                {{ $t('download') }}
              </v-btn>
            </v-col>
          </div>
          <div class="xim-movile xim-horizontal" style="width:100vw">
            <v-col clos="12">
              <v-btn class="mt-5" outlined @click="toServices">
                  {{ $t('back') }}
                </v-btn>

                <v-btn
                  class="download white--text mt-5 ml-3"
                  color="blue_dark"
                  @click="download"
                >
                  {{ $t('download') }}
                </v-btn>
            </v-col>
          </div>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { FileDownloadService } from '@SERVICES/FileDownload.service'
export default {
  name: 'VoucherCuponDescuento',
  components: {},
  data() {
    return {
      loading: true,
      ticketsData: []
    }
  },
  mounted() {
    //console.log('ticketChange : ', this.ticketChange)
  },
  destroyed() {
    this.$notify({
      group: 'info',
      clean: true
    })
  },
  computed: {
    ...mapGetters({
      ticketChange: ['getTicketChange']
    })
  },
  methods: {
    toServices() {
      this.$router.push({ path: 'changeTicket' })
    },
    download() {
      console.log(this.ticketChange);
      this.$notify({
        group: 'load',
        title: this.$t('downloading_ticket'),
        type: 'info'
      })
      try {
        FileDownloadService.getPdf(this.ticketChange.archivo)
      } catch (error) {
        console.error('ERROR-DOWNLOAD-TICKET ->', error.message)
        this.$notify({
          group: 'error',
          title: 'Error al descargar boleto',
          text: 'Intente nuevamente por favor',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.center {
  margin-top: 8vh !important;
}

.confirmation-title {
  h1 {
    text-align: center;
    line-height: 4rem !important;
    font-size: 44px;
    font-weight: bold !important;
  }

  p {
    font-size: 20px;
    color: #a0a0a0;
    text-align: center;
  }
}

.page-icon {
  border-radius: 50%;
  width: 125px;
  height: 125px;
  background-color: var(--var-orange);
}
#tblTicket {
  width: 100%;
}
#tblTicket td {
  padding: 5px;
  color: grey;
  text-align: center;
}
@media (max-width: 960px){
  #tblTicket {
    width: 100%;
    display: flex;
  }
  .content{
    display: flex;
    min-width: 50%;
    flex-direction: column;
  }
}
</style>
