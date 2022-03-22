<template>
  <div class="search-cupon custom-form bgCupon">
    <v-row v-if="cuponList.length <= 0">
      <v-col cols="12" sm="12" md="10" offset-md="1">
        <v-card
          color="elevation-24 rounded-search-box px-12 v-card v-sheet theme--light light"
          class="search-card"
        >
          <v-card-text>
            <p class="blue_dark--text my-5">
              {{ $t('central_coast.content') }}
            </p>
            <div class="my-6 blue_dark--text" style="font-size: 0.875rem">
              <h2>
                <v-icon color="blue_dark" size="24" class="xim-ico"
                  >mdi-arrow-down-thin-circle-outline</v-icon
                >
                {{ $t('central_coast.form') }}
              </h2>
            </div>
            <v-container class="formcontainer">
              <v-form v-model="validForm">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-row>
                      <v-col cols="12" md="4" >
                        <v-text-field
                          filled
                          outlined
                          dense
                          v-model="rut"
                          label="Rut"
                          outline-0
                          color="blue"
                          :rules="rutRules"
                          required
                          maxLength="10"
                          @keypress="validar($event, 'rut')"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <v-row>
                      <v-col cols="12" md="4" class="py-0">
                        <cities-from-list
                          direction="from"
                          v-model="fromCity"
                          :windowHeight="windowSize.y"
                          :rules="generalRules"
                          required
                        />
                      </v-col>
                      <v-col
                        md="1"
                        cols="12"
                        class="py-0 d-flex justify-center align-center"
                      >
                        <v-btn
                          icon
                          color="black"
                          @click="exchangeCities"
                          style="margin-bottom: 18px"
                        >
                          <v-icon size="24" color="blue_dark">autorenew</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col cols="12" md="4" class="py-0">
                        <cities-to-list
                          direction="to"
                          v-model="toCity"
                          :windowHeight="windowSize.y"
                          :rules="generalRules"
                          required
                        />
                      </v-col>
                      <v-col cols="12" md="3" class="py-0 xim-alc">
                        <v-btn
                          class="white--text"
                          :disabled="!validForm"
                          :loading="loading"
                          color="orange_dark"
                          @click="validateMethod"
                        >
                          <span>{{ $t('consult') }}</span>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!-- <v-col cols="12" md="10"></v-col>
                  <v-col cols="12" md="2">
                    <v-btn
                      class="white--text"
                      :disabled="!validForm"
                      :loading="loading"
                      color="orange_dark"
                      @click="validateMethod"
                    >
                      <span>{{ $t('consult') }}</span>
                    </v-btn>
                       <v-col cols="12" md="10"></v-col>
                    
                  </v-col> -->
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-col cols="12" sm="12" md="10" offset-md="1" v-if="cuponList.length > 0">
      <v-container class="cupon-list">
        <v-row no-gutters cols="12" sm="12" md="10">
          <v-col :key="cupon.idCuponera" v-for="cupon in itemsPerPage" cols="12" sm="4">
            <v-card :loading="loading" class="mx-auto my-12" max-width="320">
              <v-container>
                <v-row dense>
                  <v-col cols="12">
                    <v-card color="#2069E0" style="margin: 0 5px; padding: 5px">
                      <div class="white--text xim-horizontal-card">
                        <img
                          src="../../../static/logos/coupon/departure_board_black_18dp.svg"
                          width="18px"
                          class="xim-ml-10"
                        />
                        {{ cupon.origenNombre }}
                      </div>
                      <div class="white--text xim-horizontal-card">
                        <img
                          src="../../../static/logos/coupon/directions_bus_filled_black_18dp.svg"
                          width="18px"
                          class="xim-ml-10"
                        />
                        {{ cupon.destinoNombre }}
                      </div>
                      <div class="white--text xim-horizontal-card">
                        <img
                          src="../../../static/logos/coupon/badge_white_18dp.svg"
                          width="18px"
                          class="xim-ml-10"
                        />
                        {{ cupon.programa }}
                      </div>
                      <div
                        v-if="cupon.clase === 'SEM'"
                        class="white--text xim-horizontal-card"
                      >
                        <img
                          src="../../../static/logos/coupon/category_black_18dp.svg"
                          width="18px"
                          class="xim-ml-10"
                        />
                        SEMI CAMA
                      </div>
                      <div
                        v-if="cupon.clase === 'EJE'"
                        class="white--text xim-horizontal-card"
                      >
                        <img
                          src="../../../static/logos/coupon/category_black_18dp.svg"
                          width="18px"
                          class="xim-ml-10"
                        />
                        EJECUTIVO
                      </div>
                      <div
                        v-if="cupon.clase === 'SAL'"
                        class="white--text xim-horizontal-card"
                      >
                        <img
                          src="../../../static/logos/coupon/category_black_18dp.svg"
                          width="18px"
                          class="xim-ml-10"
                        />
                        SALÓN CAMA
                      </div>
                      <div class="white--text xim-horizontal-card">
                        <img
                          src="../../../static/logos/coupon/timer_black_18dp.svg"
                          width="18px"
                          class="xim-ml-10"
                        />
                        {{
                          cupon.cantidadIda + ' Ida ' + cupon.cantidadVuelta + ' Vuelta'
                        }}
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>

              <template slot="progress">
                <v-progress-linear
                  color="blue_dark"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-divider class="mx-4"></v-divider>
              <div>
                <v-card-title class="justify-center">
                  <h3 class="blue_dark--text">Valor Cuponera</h3>
                </v-card-title>
              </div>

              <v-divider class="mx-4"></v-divider>
              <div>
                <v-card-title class="justify-center">
                  <h2 class="blue_dark--text">{{ cupon.total | currency }}</h2>
                </v-card-title>
              </div>

              <v-card-actions class="justify-center">
                <v-btn
                  class="white--text"
                  :loading="loading"
                  color="#E75F00"
                  @click="buyCoupon(cupon)"
                >
                  <span>Seleccionar</span>
                </v-btn>

                <div class="text-center">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-card-actions class="justify-center">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <div>
                            <img
                              src="../../../static/logos/coupon/search_black_24dp.svg"
                              width="24px"
                              position="center center"
                            />
                          </div>
                        </v-btn>
                      </v-card-actions>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5">
                        <h3 class="blue_dark--text">Detalle Cuponera</h3>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card
                        color=""
                        :loading="loading"
                        class="mx-auto my-12"
                        max-width="1200"
                      >
                        <v-container>
                          <v-row dense>
                            <v-col cols="12">
                              <v-row>
                                <v-col cols="1" sm="1">
                                  <img
                                    src="../../../static/logos/coupon/mode_of_travel_black_24dp.svg"
                                    class="xim-icon-pos"
                                  />
                                </v-col>
                                <v-col cols="4" sm="4" class="text-left">
                                  <h3 class="xim-h3 blue_dark--text">Origen - Destino</h3>
                                </v-col>
                                <v-col cols="7" sm="7" class="text-left">
                                  <span class="xim-strong blue_dark--text">{{
                                    cupon.origenNombre + ' - ' + cupon.destinoNombre
                                  }}</span>
                                </v-col>
                              </v-row>
                              <v-divider class="mx-4"></v-divider>
                              <v-row>
                                <v-col cols="1" sm="1">
                                  <img
                                    src="../../../static/logos/coupon/category_black_24dp.svg"
                                    class="xim-icon-pos"
                                  />
                                </v-col>
                                <v-col cols="4" sm="4" class="text-left">
                                  <h3 class="xim-h3 blue_dark--text">Tipo de bus</h3>
                                </v-col>
                                <v-col cols="7" sm="7" class="text-left">
                                  <span
                                    class="xim-strong blue_dark--text"
                                    v-if="cupon.clase === 'SEM'"
                                  >
                                    SEMI CAMA
                                  </span>
                                  <span
                                    class="xim-strong blue_dark--text"
                                    v-if="cupon.clase === 'EJE'"
                                  >
                                    EJECUTIVO
                                  </span>
                                  <span
                                    class="xim-strong blue_dark--text"
                                    v-if="cupon.clase === 'SAL'"
                                  >
                                    SALÓN CAMA
                                  </span>
                                </v-col>
                              </v-row>
                              <v-divider class="mx-4"></v-divider>
                              <v-row>
                                <v-col cols="1" sm="1">
                                  <img
                                    src="../../../static/logos/coupon/fact_check_black_24dp.svg"
                                    class="xim-icon-pos"
                                  />
                                </v-col>
                                <v-col cols="4" sm="4" class="text-left">
                                  <h3 class="xim-h3 blue_dark--text">Programa</h3>
                                </v-col>
                                <v-col cols="7" sm="7" class="text-left">
                                  <span class="xim-strong blue_dark--text">{{
                                    cupon.programa
                                  }}</span>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="1" sm="1">
                                  <img
                                    src="../../../static/logos/coupon/attach_money_black_24dp.svg"
                                    class="xim-icon-pos"
                                  />
                                </v-col>
                                <v-col cols="4" sm="4" class="text-left">
                                  <h3 class="xim-h3 blue_dark--text">Valor</h3>
                                </v-col>
                                <v-col cols="7" sm="7" class="text-left">
                                  <span class="xim-strong blue_dark--text">
                                    {{ cupon.total | currency }}
                                  </span>
                                </v-col>
                              </v-row>
                              <v-divider class="mx-4"></v-divider>
                              <v-row>
                                <v-col cols="1" sm="1">
                                  <img
                                    src="../../../static/logos/coupon/confirmation_number_black_24dp.svg"
                                    class="xim-icon-pos"
                                  />
                                </v-col>
                                <v-col cols="4" sm="4" class="text-left">
                                  <h3 class="xim-h3 blue_dark--text">Boletos</h3>
                                </v-col>
                                <v-col cols="7" sm="7" class="text-left">
                                  <span class="xim-strong blue_dark--text">
                                    {{
                                      cupon.cantidadIda +
                                        ' Boletos Ida - Boletos Vuelta ' +
                                        cupon.cantidadVuelta
                                    }}
                                  </span>
                                </v-col>
                              </v-row>
                              <v-divider class="mx-4"></v-divider>
                              <v-row>
                                <v-col cols="1" sm="1">
                                  <img
                                    src="../../../static/logos/coupon/event_busy_black_24dp.svg"
                                    class="xim-icon-pos"
                                  />
                                </v-col>
                                <v-col cols="4" sm="4" class="text-left">
                                  <h3 class="xim-h3 blue_dark--text">Expiración</h3>
                                </v-col>
                                <v-col cols="7" sm="7" class="text-left">
                                  <span class="xim-strong blue_dark--text">
                                    {{ cupon.fechaDesde + ' / ' + cupon.fechaHasta }}
                                  </span>
                                </v-col>
                              </v-row>
                              <v-divider class="mx-4"></v-divider>
                              <v-row>
                                <v-col cols="1" sm="1">
                                  <img
                                    src="../../../static/logos/coupon/fact_check_black_24dp.svg"
                                    class="xim-icon-pos"
                                  />
                                </v-col>
                                <v-col cols="4" sm="4" class="text-left">
                                  <h3 class="xim-h3 blue_dark--text">Reglas</h3>
                                </v-col>
                                <v-col cols="7" sm="7">
                                  <span class="xim-strong blue_dark--text">
                                    <span
                                      >* Los boletos son en blanco o por confirmar.</span
                                    ><br />
                                    <span>* No se pueden hacer re-ventas.</span><br />
                                    <span
                                      >* Las cuponeras son nominativas(al nombre del
                                      comprador).</span
                                    ><br />
                                    <span
                                      >* No se pueden confirmar boletos si coinciden con
                                      la hora de otro viaje confirmado.</span
                                    ><br />
                                  </span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-pagination
          color="blue_dark"
          circle
          v-model="page"
          :length="paginationLength"
          :total-visible="7"
          class="mt-12"
        ></v-pagination>
      </v-container>
    </v-col>
  </div>
</template>

<script>
// Base components
import CitiesFromList from '@/views/CouponServices/CitiesFrom'
import CitiesToList from '@/views/CouponServices/CitiesTo'

import API from '@/services/api/coupon'

export default {
  props: ['type'],
  components: {
    CitiesFromList,
    CitiesToList
  },
  data: () => ({
    loading: false,
    validForm: false,
    fromCity: null,
    toCity: null,
    windowSize: { x: window.innerWidth, y: window.innerHeight },
    generalRules: [v => !!v || 'Este campo es requerido'],
    cuponList: [],
    sheet: false,
    show: false,
    page: 1,
    rut:null,
    forLS: JSON.parse(localStorage.getItem('vuex'))
  }),
  computed: {
    paginationLength() {
      return Math.ceil(this.cuponList.length / 6)
    },
    itemsPerPage() {
      let pages = []
      let page = []
      for (const servicesGroup of this.cuponList) {
        page.push(servicesGroup)
        if (page.length === 6) {
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
  mounted() {
    this.$store.dispatch('LOAD_CUPONERA_LIST', {})
  },
  watch: {
    fromCity(value) {
      console.log('CUPONERA ->', value)
      if (value == null) {
        this.toCity = null
      } else {
        let searchingCity = value.codigo
        this.$store.dispatch('LOAD_CUPONERA_TO_LIST', {
          searchingCity
        })
      }
    }
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    exchangeCities() {
      const fromCity = this.fromCity
      this.fromCity = this.toCity
      this.toCity = fromCity
    },
    validateSearch() {
      this.cuponList = []
      window.scroll(0, 0)
      if (this.fromCity == null) {
        this.$notify({
          group: 'error',
          title: this.$t('select_origin'),
          type: 'error'
        })
        return
      }
      if (this.toCity == null) {
        this.$notify({
          group: 'error',
          title: this.$t('select_destination'),
          type: 'error'
        })
        return
      }
      this.loading = true
      this.$notify({
        group: 'load',
        title: 'Buscando Cuponeras',
        type: 'info'
      })
      let cupon = {
        idSistema: process.env.ID_SISTEMA,
        origen: this.fromCity.codigo,
        destino: this.toCity.codigo,
        programa:this.rut,
        //programa:
        //  this.$store.state.userClubBeneficios.programa 
        //    ? this.$store.state.userClubBeneficios.programa
        //    : 'PREMIUM'
      }
      console.log(cupon)

      API.getListCoupon(cupon)
        .then(response => {
          if (response.data.length > 0) {
            response.data.forEach(item => {
              this.cuponList.push(item)
            })
          } else {
            this.$notify({
              group: 'error',
              title: 'No existen cuponeras disponibles para este tramo',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    buyCoupon(cupon) {
      this.$store.dispatch('SET_COUPON_BUY', {
        cupon
      })
      this.$router.push({ path: `couponDetail/` })
    },
    validateMethod() {
      this.validateSearch()
      /*       if(this.forLS.userData.active === false && this.forLS.userCoupon.active === false){
          this.$router.push({ path: `optionCoupon/` })
      }else{
        this.validateSearch()
      } */
    }
  }
}
</script>

<style lang="scss">
$padding: 100px;
.xim-icon-pos {
  margin: 0 0 0 50px;
}
.search-cupon {
  .searchContainer {
    padding-top: $padding;
    padding-bottom: $padding;
    min-height: 100vh;
  }

  #tblCupon {
    width: 100%;
  }
  #tblCupon td {
    padding: 5px;
  }
}
.formcontainer {
  padding: 12px 0;
}
.xim-alc {
  padding: 0 5%;
}
.xim-ml-10 {
  padding: 0 3px 2px 0;
}
.xim-horizontal-card {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 0 0 0 5px;
}
.xim-strong {
  font-weight: 900;
  width: 100%;
  margin: 0 20px 0 0;
  text-align: right;
}
.xim-h3 {
  width: 100%;
}
.xim-al-h {
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: flex-start;
}

.search-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
}
.cupon-list {
  padding-top: 200px;
}
@media (max-width: 960px) {
  .cupon-list {
    padding-top: 10px;
  }
  .formcontainer {
    padding: 0;
  }
  .xim-alc {
    padding: 0 25%;
  }
}
@media (max-width: 530px) {
  .formcontainer {
    padding: 0;
  }
  .xim-alc {
    padding: 0 25%;
  }
  .xim-ico {
    display: none;
  }
}
</style>
