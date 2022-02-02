<template>
  <div class="bgCupon">
    <v-container class="center">
      <div class="xim-searchcontent"></div>
      <v-form>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6" class="pt-0">
            <div class="xbtn xclub" @click="validateUserLogin">
              <h4 class="xim-titulo-boton">Club Beneficio</h4>
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6" class="pt-0" >
            <div class="xbtn xgen" @click="openFormGeneral">
              <h4 class="xim-titulo-boton">Público General</h4>               
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
// Base components

import { mapGetters } from 'vuex'
import openDialog from '@/helpers/openDialog'

export default {
  components: {},
  data: () => ({
    loading: false,
    validForm: false,
    fromCity: null,
    toCity: null,
    windowSize: { x: window.innerWidth, y: window.innerHeight },
    generalRules: [(v) => !!v || 'Este campo es requerido'],
    cuponList: [],
    sheet: false,
    show: false,
    page: 1,
    forLS: JSON.parse(localStorage.getItem('vuex')),
    loginDialog: false,
  }),
  computed: {
    ...mapGetters({}),
  },
  methods: {
    openDialog,
    validateUserLogin() {
      this.forLS = JSON.parse(localStorage.getItem('vuex'));
      if(this.forLS.userData.active === false){
        openDialog('login') 
      }else{
         this.$router.push({ path: `/couponServices/` })
      }
    },
    openFormGeneral() {
      this.$router.push({ path: `formPublic` })
    }
  },
}
</script>


<style>
#tblCupon {
  width: 100%;
}
#tblCupon td {
  padding: 5px;
}
.checkbox {
  display: inline-block !important;
}
.termLink {
  color: var(--var-blue_light);
  text-decoration: underline;
}
.termLink:hover {
  cursor: pointer;
}
.webpay-payment {
  width: 150px;
}
input {
  text-transform: uppercase;
}

</style>
