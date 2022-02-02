<template>
  <div class="pt-5">
    <div class="xim-desktop">
      <div v-if="loadingServices" style="text-align: center">
        <v-progress-circular indeterminate :size="100" color="blue"></v-progress-circular>
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
              <v-expansion-panel-header style="overflow: hidden">
                <v-row no-gutters>
                  <v-col cols="1" v-if="!hasVuelta">
                    <div
                      v-if="service.idaVueltaPisoUno || service.idaVueltaPisoDos"
                      class="white--text text-left orange promotion-advice"
                    >
                      <span class="ml-8 caption">{{ service.textoPromocion }}</span>
                    </div>
                  </v-col>
                  <v-col cols="1">
                    <img
                      v-if="service.mascota === '1'"
                      src="../../../../../static/logos/seats/icono_pata_verde.svg"
                      class="service-pet-image"
                    />
                  </v-col>
                  <v-col :cols="hasVuelta ? 11 : 10">
                    <v-row>
                      <v-col cols="2">
                        <span class="headline d-block">
                          <img
                            :src="'data:image;base64,' + service.logo"
                            class="service-company-image"
                          />
                          <v-btn
                            text
                            :small="windowSize.x <= 1100"
                            :large="windowSize.x > 1100"
                            @click.stop="
                              serviceForItinerary = service
                              dialog = true
                            "
                          >
                            <v-icon color="orange">mdi-plus</v-icon>
                            <span
                              class="capitalize body-1"
                              :class="windowSize.x <= 1100 ? 'displayNone' : 'body-2'"
                              >itinerario</span
                            >
                          </v-btn>
                        </span>
                      </v-col>
                      <v-col cols="2">
                        <span class="body-2 d-block">{{ fechaSubida }}</span>
                        <span
                          class="headline d-block"
                          style="font-size: 1rem !important;"
                        >
                          {{ service.horaSalida }}
                        </span>
                        <span class="body-2 d-block"
                          ><b>{{ textoSalida }}:</b></span
                        >
                        <span class="body-2 d-block">{{ service.terminalOrigen }}</span>
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
                        <span class="body-2 d-block"
                          ><b>{{ textoLlegada }}:</b></span
                        >
                        <span class="body-2 d-block">{{ service.terminaLlegada }}</span>
                      </v-col>
                      <v-col cols="2" v-for="(piso, index) in service.pisos" :key="index">
                        <span class="d-block promotion-internet">
                          $ {{ piso.tarifaInternet }}
                          <img
                            src="../../../../../static/logos/icono_por_ciento.svg"
                            alt="percentage_logo"
                            height="25px"
                            style="vertical-align: middle;"
                          />
                        </span>
                        <span class="body-2 d-block base-price"
                          ><b>$ {{ piso.tarifa }}</b></span
                        >
                        <span class="caption d-block"
                          ><b>{{ textoPrecioOferta }}</b></span
                        >
                        <span class="caption d-block"
                          ><b>{{ $t('floor') }} {{ piso.piso + 1 }}</b></span
                        >
                        <span class="caption d-block">{{ piso.servicio }}</span>
                      </v-col>
                    </v-row>
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
                    :fechaSubida="fechaSubida"
                    :fechaIda="fechaSubidaIda"
                    :fechaVuelta="fechaSubidaVuelta"
                    :ciudadOrigen="ciudadOrigen"
                    :ciudadDestino="ciudadDestino"
                    @confirm="goToPayment"
                  />
                  <v-alert v-else color="warning" value="true" class="noServices mt-0">
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
    </div>
    <div class="xim-movile">
      <v-container class="service-item px-0">
        <v-expansion-panels class="elevation-0">
          <!-- First expasión Panel-->
          <v-expansion-panel
            :key="service.id"
            v-for="service in itemsPerPage"
            class="xim-btn-principal"
          >
            <v-expansion-panel-header class="xim-expansion">
              <v-row >
                <v-col cols="12">
                  <v-row class="xim-raro">
                    <v-col cols="12" v-if="!hasVuelta">
                      <div
                        v-if="service.idaVueltaPisoUno || service.idaVueltaPisoDos"
                        class="xim-promocion"
                      >
                        <span>{{ service.textoPromocion }}</span>
                      </div>
                    </v-col>
                    <i v-else class="xim-none"></i>
                    <v-col cols="6">
                      <span class="headline d-block xim-tr xim-esp">
                        <img
                          v-if="service.logo.length > 0"
                          :src="'data:image;base64,' + service.logo"
                          class="service-company-image"
                        />
                        <img v-else class="xim-none" />
                        <v-btn
                          class="btn-itinerario mt-3"
                          text
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
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="1" v-if="service.mascota === '1'">
                          <img
                            src="../../../../../static/logos/seats/icono_pata_verde.svg"
                            class="xim-mascota"
                          />
                        </v-col>
                        <v-col cols="5">
                          <v-icon
                            class="xim-bus-i"
                            color="orange"
                          >
                            mdi-bus-side
                          </v-icon>
                        </v-col>
                        <v-col cols="5">
                          <small class="xim-horario">{{hoursDifference(service)}}</small>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6" class="xim-tr">
                      <span class="body-2 d-block">{{ fechaSubida }}</span>
                      <span class="headline d-block" style="font-size: 1rem !important;">
                        {{ service.horaSalida }}
                      </span>
                      <span class="body-2 d-block"
                        ><b>{{ textoSalida }}:</b></span
                      >
                      <span class="body-2 d-block">{{ service.terminalOrigen }}</span>
                    </v-col>
                    <v-col cols="6" class="xim-tl">
                      <span class="body-2 d-block">{{ service.fechaLlegada }}</span>
                      <span class="headline d-block" style="font-size: 1rem !important;">
                        {{ service.horaLlegada }}
                      </span>
                      <span class="body-2 d-block"
                        ><b>{{ textoLlegada }}:</b></span
                      >
                      <span class="body-2 d-block">{{ service.terminaLlegada }}</span>
                    </v-col>
                    <v-col
                      cols="6"
                      v-for="(piso, index) in service.pisos"
                      :key="index"
                      v-bind:class="[piso.piso == 1 ? 'xim-tl' : 'xim-tr']"
                    >
                      <span class="d-block promotion-internet">
                        $ {{ piso.tarifaInternet }}
                        <img
                          src="../../../../../static/logos/icono_por_ciento.svg"
                          alt="percentage_logo"
                          height="25px"
                          style="vertical-align: middle;"
                        />
                      </span>
                      <span class="body-2 d-block base-price"
                        ><b>$ {{ piso.tarifa }}</b></span
                      >
                      <span class="caption d-block"
                        ><b>{{ textoPrecioOferta }}</b></span
                      >
                      <span class="caption d-block"
                        ><b>{{ $t('floor') }} {{ piso.piso + 1 }}</b></span
                      >
                      <span class="caption d-block">{{ piso.servicio }}</span>
                    </v-col>
                  </v-row>
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
                  :fechaSubida="fechaSubida"
                  :fechaIda="fechaSubidaIda"
                  :fechaVuelta="fechaSubidaVuelta"
                  :ciudadOrigen="ciudadOrigen"
                  :ciudadDestino="ciudadDestino"
                  @confirm="goToPayment"
                />
                <v-alert v-else color="warning" value="true" class="noServices mt-0">
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
    <Dialog :open.sync="dialog" :service="serviceForItinerary" />
  </div>
</template>

<script>
import Floor from '@/views/Services/stepper/List/Floor'
import Dialog from '@/views/Services/stepper/List/Itinerary'
import routeWithScroll from '@/helpers/routeWithScroll'
import { mapGetters } from 'vuex'
import moment from 'moment'
import API from '@/services/api/parameters'
export default {
  name: 'ElementList',

  props: {
    back: {
      type: Boolean,
      require: true
    }
  },

  data() {
    return {
      fechaSubidaIda: this.$store.state.searching.from_date,
      fechaSubidaVuelta: this.$store.state.searching.to_date,
      ciudadOrigen: this.$store.state.searching.from_city.codigo,
      ciudadDestino: this.$store.state.searching.to_city.codigo,
      serviceForItinerary: '',
      page: 1,
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      dialog: false,
      confirmTicketDialog: false,
      expand: false,
      rowsPerPage: [10, 20, 30, { text: 'Todos', value: -1 }],
      textoPrecioOferta: '',
      textoSalida: '',
      textoLlegada: ''
    }
  },
  components: {
    Floor,
    Dialog
  },
  async mounted() {
    let params = { portal: { id: 7 }, portalSeccion: { id: '3' } }
    const response = await API.getContenidoSeccion(params)
    const data = response.data
    console.log(data)
    data.forEach(item => {
      if (item.llave == 'TEXTO_OFERTA')
        this.textoPrecioOferta = item.portalSeccContenidoI18ns.find(
          x => x.i18n == 'es'
        ).descripcion
      if (item.llave == 'TEXTO_SALIDA')
        this.textoSalida = item.portalSeccContenidoI18ns.find(
          x => x.i18n == 'es'
        ).descripcion
      if (item.llave == 'TEXTO_LLEGADA')
        this.textoLlegada = item.portalSeccContenidoI18ns.find(
          x => x.i18n == 'es'
        ).descripcion
    })
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
      seatsWithPromoNotSelected: ['seatsWithPromoNotSelected'],
      seatsWithPromo: ['seatsWithPromo'],
      selectedSeats: ['seats'],
      searching: ['getSearching'],
      loadingServices: ['getLoadingService'],
      payment_info: ['payment_info'],
      hasVuelta: ['hasVuelta'],
      selectedTab: ['getServicesTab']
    }),
    fechaSubida() {
      const dateFromStore =
        this.selectedTab === 'tab-Vuelta' && this.hasVuelta
          ? this.fechaSubidaVuelta
          : this.fechaSubidaIda
      const dateItems = dateFromStore.split('-')
      const fechaSubida = `${dateItems[2]}/${dateItems[1]}/${dateItems[0]}`
      return fechaSubida
    },
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
      let count = 0
      if (this.searching.petService) {
        for (const service of this.services) {
          if (service.mascota === '1') {
            count++
          }
        }
        return Math.ceil(count / 5)
      }
      return Math.ceil(this.services.length / 5)
    },
    itemsPerPage() {
      let pages = []
      let page = []
      for (const servicesGroup of this.services) {
        if (this.searching.petService) {
          if (servicesGroup.mascota === '1') {
            page.push(servicesGroup)
          }
        } else {
          page.push(servicesGroup)
        }
        //page.push(servicesGroup)
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
  watch: {
    loadingServices(value) {
      if (value) {
        this.fechaSubidaIda = this.$store.state.searching.from_date
        this.fechaSubidaVuelta = this.$store.state.searching.to_date
      }
    }
  },
  methods: {
    hoursDifference(service) {
      const from = this.fechaSubida + 'T' + service.horaSalida
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
      routeWithScroll('#paymentStepper', 'ServicesPaymentData')
    }
  }
}
</script>
