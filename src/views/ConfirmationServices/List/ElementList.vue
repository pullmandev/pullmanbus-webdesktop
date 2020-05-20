<template>
  <div class="pt-5" id="#elementList">
    <div v-if="loadingServices" style="text-align: center">
      <v-progress-circular
        indeterminate
        :size="100"
        color="blue"
      ></v-progress-circular>
    </div>
    <div v-else-if="servicesList.length > 0">
      <v-container class="service-item px-0">
        <v-expansion-panels class="elevation-0">
          <!-- First expasión Panel-->
          <v-expansion-panel
            :key="service.id"
            v-for="service in itemsPerPage"
            class="arrow elevation-0"
          >
            <v-expansion-panel-header style="overflow: hidden">
              <v-row>
                <v-col cols="2">
                  <span class="headline d-block">
                    <img
                      :src="'data:image;base64,' + service.logo"
                      class="service-company-image"
                    />
                    <v-btn
                      text
                      large
                      @click.stop="
                        serviceForItinerary = service
                        dialog = true
                      "
                    >
                      <v-icon color="orange">mdi-plus</v-icon>
                      <span class="capitalize body-1">itinerario</span>
                    </v-btn>
                  </span>
                </v-col>
                <v-col cols="2">
                  <span class="body-2 d-block">{{ service.fechaSalida }}</span>
                  <span
                    class="headline d-block"
                    style="font-size: 1rem !important;"
                  >
                    {{ service.horaSalida }}
                  </span>
                  <span class="body-2 d-block"><b>Salida:</b></span>
                  <span class="body-2 d-block">{{
                    service.terminalSalida
                  }}</span>
                </v-col>
                <v-col cols="2" class="pr-12 text-center">
                  <div style="position: relative">
                    <v-icon
                      class="display-2 white"
                      style="z-index: 2"
                      color="orange"
                    >
                      mdi-bus-side
                    </v-icon>
                    <hr class="hr-bus-style" />
                  </div>
                  <small>{{ hoursDifference(service) }}</small>
                </v-col>
                <v-col cols="2">
                  <span class="body-2 d-block">{{ service.fechaLlegada }}</span>
                  <span
                    class="headline d-block"
                    style="font-size: 1rem !important;"
                  >
                    {{ service.horaLlegada }}
                  </span>
                  <span class="body-2 d-block"><b>Llegada:</b></span>
                  <span class="body-2 d-block">{{
                    service.terminalDestino
                  }}</span>
                </v-col>
                <v-col
                  cols="2"
                  v-for="(piso, index) in service.pisos"
                  :key="index"
                >
                  <span
                    class="headline d-block"
                    style="font-size: 1rem !important;"
                  >
                    $ {{ piso.tarifaInternet }}
                  </span>
                  <span
                    class="body-2 d-block"
                    style="text-decoration: line-through"
                    ><b>$ {{ piso.tarifa }}</b></span
                  >
                  <span class="caption d-block"><b>Promoción internet</b></span>
                  <span class="caption d-block"
                    ><b>Piso {{ piso.piso + 1 }}</b></span
                  >
                  <span class="caption d-block">{{ piso.servicio }}</span>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <floor
                  v-if="service"
                  :item="service"
                  :expanded="true"
                  :isXs="windowSize.x <= 600"
                  @confirm="goToPayment"
                />
                <v-alert
                  v-else
                  color="warning"
                  value="true"
                  class="noServices mt-0"
                >
                  <v-row class="align-center justify-center">
                    <h2>{{ $t('no_services') }}</h2>
                  </v-row>
                </v-alert>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-pagination
          color="blue_dark"
          circle
          v-model="page"
          :length="paginationLength"
          :total-visible="7"
          class="mt-12"
        ></v-pagination>
      </v-container>
    </div>
    <v-card v-else class="elevation-0">
      <span>{{ $t('no_elements') }}</span>
    </v-card>
    <Dialog :open.sync="dialog" :service="serviceForItinerary" />
  </div>
</template>
<script>
import Floor from '@/views/ConfirmationServices/List/Floor'
import Dialog from '@/views/ConfirmationServices/List/Itinerary'
import scrollAnimation from '@/helpers/scrollAnimation'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      serviceForItinerary: '',
      page: 1,
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      dialog: false,
      expand: false,
      rowsPerPage: [10, 20, 30, { text: 'Todos', value: -1 }]
    }
  },
  components: {
    Floor,
    Dialog
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
    console.log('mounted', this.servicesList)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    ...mapGetters({
      servicesList: ['getConfirmationServiceList'],
      loadingServices: ['getConfirmationLoadingService']
    }),
    langSearch() {
      return this.$t('search')
    },
    langPerPage() {
      const text = this.$t('results_page')
      return this.windowSize.x <= 600 ? text.split(' ')[0] : text
    },
    paginationLength() {
      return Math.ceil(this.servicesList.length / 5)
    },
    itemsPerPage() {
      let pages = []
      let page = []
      for (const servicesGroup of this.servicesList) {
        page.push(servicesGroup)
        if (page.length === 5) {
          pages.push(page)
          page = []
        }
      }
      if (page.length > 0) {
        pages.push(page)
        page = []
      }
      return pages[this.page - 1]
    }
  },
  methods: {
    hoursDifference(service) {
      const from = service.fechaSalida + 'T' + service.horaSalida
      const to = service.fechaLlegada + 'T' + service.horaLlegada
      const format = 'DD/MM/YYYYTHH:mm'
      const fromDate = moment(from, format)
      const toDate = moment(to, format)
      const hours = toDate.diff(fromDate, 'hours')
      const minutes = toDate.diff(fromDate, 'minutes') - hours * 60
      const result = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
      return result
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    getDepartureString(idText) {
      const text = this.$t(idText)
      if (this.windowSize.x <= 960) {
        return text.split(' ')[0]
      }
      return text
    },
    goToPaymentFromModal(paymentInfo) {
      this.$store.dispatch('SET_PAYMENT_INFO', { payment_info: paymentInfo })
      this.goToPayment()
    },
    showModal() {
      if (
        this.payment_info &&
        this.payment_info.email != null &&
        this.payment_info.email !== ''
      ) {
        this.goToPayment()
        return
      }
      this.dialog = true
    },
    goToPayment() {
      scrollAnimation('#paymentStepper')
      this.$store.dispatch('SET_STEP', { step: 2 })
    }
  }
}
</script>

<style>
.promotion-advice {
  width: 300px;
  margin-top: 10px;
  margin-left: -110px;
  transform: rotate(-60deg);
}
.hr-bus-style {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.3;
}

.icon-service-expanded {
  transform: rotate(90deg);
}

.service-company-image {
  max-width: 100%;
  height: auto;
}

@media (max-width: 1060px) {
  .service-company-image {
    max-width: 100%;
    height: auto;
  }
  .stepper__content {
    padding: 0px !important;
  }
}

@media (max-width: 1060px) {
  .service-company-image {
    width: 100%;
    height: auto;
  }
  .expansion-panel__header {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
}
.service-item {
  margin-top: 10px;
  padding-top: 0;
  padding-bottom: 0;
}

.service-container-background {
  background-color: var(--var-light) !important;
}

.blue-dark {
  background-color: var(--var-dark-blue);
}

.noServices {
  min-height: 25vh;
}

.card__text {
  padding: 2px !important;
  width: 100%;
}

.result h1,
h2,
h3 {
  font-weight: 300 !important;
}

.datatable-container {
  background-color: white;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.15), 0 1px 10px 0 rgba(0, 0, 0, 0.15),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.datatable thead th.column.sortable {
  cursor: pointer;
}

/* estilo Bus */
.border-bus {
  border-bottom: 0px solid gray;
  border-top: 0px solid gray;
}

.min-h-30 {
  min-height: 30px;
}

.maxHeightLayout {
  max-height: 55vh;
  min-height: 55vh;
  overflow-y: scroll;
}
/* tamañp de grilla */
.flex.xs1 {
  -ms-flex-preferred-size: 4.333333333333332% !important;
  flex-basis: 4.333333333333332% !important;
  max-width: 4.333333333333332% !important;
}

.v-expansion-panel-header__icon .mdi-chevron-down::before {
  background-color: #1110ad;
  color: white;
  border-radius: 50%;
  padding: 10px;
}
/* . estilo Bus */
</style>
