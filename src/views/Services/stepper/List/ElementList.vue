<template>
  <div class="pt-5">
    <div v-if="loadingServices" style="text-align: center">
      <v-progress-circular
        indeterminate
        :size="100"
        color="blue"
      ></v-progress-circular>
    </div>
    <div v-else-if="services.length > 0">
      <v-container class="service-item px-0">
        <v-expansion-panels class="elevation-0">
          <!-- First expasión Panel-->
          <v-expansion-panel
            :key="service.id"
            v-for="service in itemsPerPage"
            class="arrow elevation-0"
          >
            <v-expansion-panel-header>
              <v-row>
                <v-col cols="3">
                  <span class="headline d-block">
                    {{ service.horaSalida | to12 }}
                  </span>
                  <span class="body-2 d-block"><b>Salida:</b></span>
                  <span class="body-2 d-block">{{
                    service.terminalSalida
                  }}</span>
                </v-col>
                <v-col cols="2" class="text-center pr-12">
                  <v-icon class="display-2 d-block" color="orange">
                    mdi-arrow-right
                  </v-icon>
                  <small>1h</small>
                </v-col>
                <v-col cols="3">
                  <span class="headline d-block">
                    {{ service.horaLlegada | to12 }}
                  </span>
                  <span class="body-2 d-block"><b>Llegada:</b></span>
                  <span class="body-2 d-block">{{
                    service.terminalDestino
                  }}</span>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <floor
                  v-if="service"
                  :back="back"
                  :item="service"
                  :expanded="true"
                  :isXs="windowSize.x <= 600"
                  @confirm="showModal"
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
    <Dialog
      :dialog="dialog"
      @finish="dialog = false"
      @loged="goToPayment"
      @confirm="goToPaymentFromModal"
    />
  </div>
</template>
<script>
import Floor from '@/views/Services/stepper/List/Floor'
import Dialog from '@/views/Services/stepper/List/UserInfo'
import scrollAnimation from '@/helpers/scrollAnimation'
import { mapGetters } from 'vuex'

export default {
  props: ['search', 'back'],
  data() {
    return {
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
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    ...mapGetters({
      servicesList: ['getServiceList'],
      selectedService: ['getSelectedService'],
      searching: ['getSearching'],
      loadingServices: ['getLoadingService'],
      payment_info: ['payment_info']
    }),
    langSearch() {
      return this.$t('search')
    },
    langPerPage() {
      const text = this.$t('results_page')
      return this.windowSize.x <= 600 ? text.split(' ')[0] : text
    },
    services() {
      const services = this.servicesList(this.back)
      return services
    },
    paginationLength() {
      return Math.ceil(this.services.length / 5)
    },
    itemsPerPage() {
      let pages = []
      let page = []
      for (const servicesGroup of this.services) {
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
      console.log('view', this.services)
      return pages[this.page - 1]
    }
  },
  methods: {
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
.icon-service-expanded {
  transform: rotate(90deg);
}

.service-company-image {
  margin-top: 20px;
  width: 200px;
  height: 50px;
  max-width: 150px;
  max-height: 100px;
}

@media (max-width: 1060px) {
  .service-company-image {
    width: 100px;
    height: 25px;
  }
  .stepper__content {
    padding: 0px !important;
  }
}

@media (max-width: 1060px) {
  .service-company-image {
    width: 60px;
    height: 15px;
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

/* . estilo Bus */
</style>
