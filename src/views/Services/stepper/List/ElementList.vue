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
            :key="index"
            v-for="(company, index) in getPricesByCompany"
            class="arrow elevation-0"
          >
            <v-expansion-panel-header>
              <v-row>
                <v-col cols="3">
                  <span class="headline d-block">
                    {{ company.data[0].horaSalida | to12 }}
                  </span>
                  <span class="body-2 d-block"><b>Salida:</b></span>
                  <span class="body-2 d-block">{{
                    company.data[0].terminalSalida
                  }}</span>
                </v-col>
                <v-col cols="2" class="text-center pr-12">
                  <v-icon class="display-2 d-block" color="orange"
                    >mdi-arrow-right</v-icon
                  >
                  <small>1h</small>
                </v-col>
                <v-col cols="3">
                  <span class="headline d-block">
                    {{
                      company.data[company.data.length - 1].horaSalida | to12
                    }}
                  </span>
                  <span class="body-2 d-block"><b>Llegada:</b></span>
                  <span class="body-2 d-block">{{
                    company.data[0].terminalDestino
                  }}</span>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <v-data-table
                  v-if="company && company.data.length > 0"
                  no-data-text
                  hide-default-footer
                  :headers="headers"
                  :items="company.data"
                  item-key="id"
                  style="width: 100%;"
                  show-expand
                >
                  <template slot="item" slot-scope="props">
                    <tr
                      @click="props.expanded = !props.expanded"
                      class="result"
                    >
                      <td></td>
                      <td>
                        <h3 v-if="props.item.pisos[0]">
                          {{ props.item.pisos[0].servicio }}
                        </h3>
                        <small
                          style="font-size: 12px;"
                          v-if="props.item.pisos[1]"
                        >
                          {{ props.item.pisos[1].servicio }}
                        </small>
                      </td>
                      <td :class="{ 'px-0': windowSize.x <= 600 }">
                        <h2>{{ props.item.pisosNumber }}</h2>
                      </td>
                      <td>
                        <h2 v-if="props.item.pisos[0]">
                          $ {{ props.item.pisos[0].tarifaInternet }}
                        </h2>
                        <small
                          style="font-size: 14px;"
                          v-if="props.item.pisos[1]"
                        >
                          $ {{ props.item.pisos[1].tarifaInternet }}
                        </small>
                      </td>
                      <td>
                        <v-btn
                          dark
                          color="blue"
                          @click="props.expand(!props.isExpanded)"
                          >Comprar</v-btn
                        >
                      </td>
                    </tr>
                  </template>
                  <!-- template of passenger -->
                  <template slot="expanded-item" slot-scope="props">
                    <td :colspan="props.headers.length" class="px-0">
                      <floor
                        ref="floor"
                        :back="back"
                        :item="props.item"
                        :expanded="props.expanded"
                        :isXs="windowSize.x <= 600"
                        @confirm="showModal"
                      />
                    </td>
                  </template>
                </v-data-table>
                <v-alert
                  v-else
                  color="warning"
                  value="true"
                  class="noServices mt-0"
                >
                  <v-row class="align-center justify-center">
                    <h2 v-lang.no_services></h2>
                  </v-row>
                </v-alert>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
    </div>
    <v-card v-else class="elevation-0">
      <span v-lang.no_elements></span>
    </v-card>
    <Dialog
      :dialog="dialog"
      @finish="dialog = false"
      @confirm="goToPaymentFromModal"
    />
  </div>
</template>
<script>
import Floor from '@/views/Services/stepper/List/Floor'
import Dialog from '@/views/Services/stepper/List/UserInfo'
import scrollAnimation from '@/helpers/scrollAnimation'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  props: ['search', 'back'],
  data() {
    return {
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
      companiesFilter: ['getUserCompanyFilter'],
      payment_info: ['payment_info']
    }),
    headers() {
      return [
        {
          text: this.translate('service'),
          sortable: false,
          value: 'servicioPrimerPiso',
          class: 'hidden-sm-and-down',
          align: 'start'
        },
        {
          text: this.translate('floors'),
          sortable: false,
          value: 'pisosNumber',
          align: 'left',
          class: this.windowSize.x <= 600 ? 'px-0' : ''
        },
        {
          text: '',
          sortable: false,
          value: 'tarifaPrimerPiso',
          align: 'left',
          class: 'hidden-sm-and-down'
        },
        {
          text: ' ',
          sortable: false,
          value: '',
          align: 'center',
          class: 'hidden-sm-and-down'
        }
      ]
    },
    langSearch() {
      return this.translate('search')
    },
    langPerPage() {
      const text = this.translate('results_page')
      return this.windowSize.x <= 600 ? text.split(' ')[0] : text
    },
    getIdCompanyBySearch() {
      const filter = this.search.trim().toLowerCase()
      const filtered = this.companiesFilter.filter(item => {
        if (item.name === 'Todos') {
          return false
        }
        const companyName = item.name.toLowerCase()
        const regex = new RegExp(filter)
        return regex.test(companyName)
      })
      console.log('filtered', filtered)
      return filtered.map(item => item.id)
    },
    services() {
      const services = this.servicesList(this.back)
      return services
    },
    getPricesByCompany() {
      const classFilter = this.$store.state.serviceFilters.class
      const result = this.services.map(company => {
        let list = []
        company.data.map(service => {
          const result = service.pisos.map(piso => {
            return _.pick(piso, ['servicio', 'tarifaInternet'])
          })
          list = list.concat(result)
          if (service.pisos.length > 1) {
            service.pisosNumber = '02'
          } else {
            service.pisosNumber = '01'
          }
          return service
        })
        list.sort((a, b) => {
          return a.tarifaInternet - b.tarifaInternet
        })
        let lowPrices = []
        classFilter.forEach(service => {
          if (service != 'Todos') {
            const sortedItem = list.filter(item => item.servicio === service)[0]
            lowPrices.push({
              servicio: service,
              tarifa: sortedItem ? sortedItem.tarifaInternet : 0
            })
          }
        })
        return { ...company, lowPrices }
      })
      console.log('low', result)
      return result
    }
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    getDepartureString(idText) {
      const text = this.translate(idText)
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

.icon-service {
  color: var(--var-red);
  font-size: 30px;
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
/* .arrow .expansion-panel__header .icon {
  color: rgba(63, 12, 182, 0.54);
  font-size: 60px;
}

.arrow .expansion-panel__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  height: 110px;
} */

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
