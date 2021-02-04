<template>
  <div id="idSearchConfirm">
    <v-row>
      <v-col cols="12" sm="12" md="10" offset-md="1">
        <v-card class="mt-12">
          <v-toolbar dense class="elevation-0" dark color="blue_light" id="serviceToolbar">
            <v-toolbar-title>
              <span class="title ml-3">Cuponera</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form v-model="validForm">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <v-row>
                      <v-col class="py-0">
                        <cities-from-list
                          direction="from"
                          v-model="fromCity"
                          :windowHeight="windowSize.y"
                          :rules="generalRules"
                          required
                        />
                      </v-col>
                      <v-col md="1" cols="12" class="py-0 d-flex justify-center align-center">
                        <v-btn icon color="black" @click="exchangeCities">
                          <v-icon>sync_alt</v-icon>
                        </v-btn>
                      </v-col>
                      <v-col class="py-0">
                        <cities-to-list 
                          direction="to" 
                          v-model="toCity" 
                          :windowHeight="windowSize.y"
                          :rules="generalRules"
                          required
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" md="10"></v-col>
                  <v-col cols="12" md="2">
                    <v-btn
                      class="white--text"
                      :disabled="!validForm"
                      :loading="loading"
                      color="blue_dark"
                      @click="validateSearch"
                    >
                      <span>Consultar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="10" offset-md="1" v-if="cuponList.length > 0">
        <v-card class="mt-3">
          <v-card-text>
            <v-container>
              <table id="tblCupon">
                <tr>
                  <th>Empresa</th>
                  <th>Programa</th>
                  <th>Servicio</th>
                  <th>Ruta</th>
                  <th>Boletos</th>
                  <th>Distribucion</th>
                  <th>Valor</th>
                  <th></th>
                </tr>
                <tr v-for="(cupon, i) of cuponList" :key="i">
                  <td>
                    <img
                      :src="'data:image;base64,' + cupon.empresaLogo"
                      class="service-company-image"
                      :title="cupon.empresaDescripcion"/>
                  </td>
                  <td>{{ cupon.programa }}</td>
                  <td>{{ cupon.claseDescripcion }}</td>                  
                  <td>{{ cupon.rutaDescripcion }}</td>
                  <td><b>{{ cupon.boletos}}</b></td>
                  <td>{{ cupon.distribucion }}</td>
                  <td>{{ cupon.total | currency }}</td>
                  <td>
                    <v-btn
                      class="white--text"
                      :loading="loading"
                      color="blue_dark"
                      @click="buyCoupon(cupon)">
                      <span>Comprar</span>
                    </v-btn>
                  </td>
                </tr>
              </table>            
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
    cuponList:[]
  }),
  computed: {        
  },
  mounted() {
    this.$store.dispatch('LOAD_CITIES_LIST', {})
  },
  watch: {
    fromCity(value) {
      let searchingCity = value.codigo
      this.$store.dispatch('LOAD_CITIES_TO_LIST', {
        searchingCity
      })
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
      this.cuponList = [];
      if(this.fromCity == null){
        this.$notify({
        group: 'error',
        title: this.$t('select_origin'),
        type: 'error'
        })
        return;
      }
      if(this.toCity == null){
        this.$notify({
        group: 'error',
        title: this.$t('select_destination'),
        type: 'error'
        })
        return;
      }
      this.loading = true
      this.$notify({
        group: 'load',
        title: 'Buscando Cuponeras',
        type: 'info'
      })
      let cupon = {
          "idSistema":1,
          "origen": this.fromCity.codigo,
          "destino": this.toCity.codigo
      }
      //console.log(cupon)
      API.getListCoupon(cupon)
        .then(response => {
          if(response.data.length > 0){
            response.data.forEach(item => {
              this.cuponList.push(item)
            })          
          }else{
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
    buyCoupon(cupon){
      this.$store.dispatch('SET_COUPON_BUY', {
        cupon
      })
      this.$router.push({ path: `couponDetail/` })
    }
  }
}
</script>
<style lang="scss" scoped>
$padding: 100px;
.searchContainer {
  padding-top: $padding;
  padding-bottom: $padding;
  min-height: 100vh;
}
#tblCupon{
  width: 100%;
}
#tblCupon td{
  padding: 5px;
}
</style>
