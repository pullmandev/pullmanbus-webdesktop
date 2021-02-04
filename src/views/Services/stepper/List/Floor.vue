<template>
  <div>
    <ServicesListPanel
      :open.sync="confirmTicketDialog"
      :seat="addedSeat"
      @accept="confirmationAmountFromDialog"
    />
    <Dialog :open="dialog" :type="messageType" @close="closeDialog" />
    <SeatDetail :open.sync="seatDetail" :seat="seatForDetail" />
    <v-card flat class="hideAsientos mt-3">
      <!-- Grilla de asientos -->
      <div v-if="loadingSeats" style="text-align: center">
        <v-progress-circular
          indeterminate
          :size="50"
          color="blue"
        ></v-progress-circular>
      </div>
      <v-container
        fluid
        v-else-if="bus.grilla.length > 0"
        class="px-0"
        :class="{ 'pa-0': isXs }"
      >
        <v-row dense :justify="floorArray.length === 1 ? 'center' : undefined">
          <v-col
            cols="4"
            md="4"
            v-for="(selectedFloor, index) in floorArray"
            :key="index"
            :class="{ 'left-border': selectedFloor > 0 }"
            class="pa-0"
            style="overflow: hidden; position: relative"
          >
            <div
              v-if="
                data.pisos[selectedFloor].confirmation.idaVuelta && !hasVuelta
              "
              class="white--text text-left orange promotion-advice-floor"
            >
              <span class="ml-8 caption">{{ data.textoPromocion }}</span>
            </div>
            <div>
              <h2 class="text-center mb-1">
                {{
                  data.pisos[selectedFloor].piso > 0
                    ? 'Segundo piso'
                    : 'Primer piso'
                }}
              </h2>
              <h4 class="text-center mb-3 subheading">
                {{ data.pisos[selectedFloor].servicio }} - ${{
                  data.pisos[selectedFloor].tarifaInternet
                }}
              </h4>
              <v-row justify="center" dense>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                  lg="10"
                  class="text-center mb-4 border-bus"
                >
                  <div
                    v-for="(col, i) in bus.grilla[
                      data.pisos[selectedFloor].piso
                    ].grid"
                    :key="i"
                    class="blank-seat-rem"
                  >
                    <!-- acá tengo las columnas del bus (son 5)-->
                    <div
                      class="d-inline-block"
                      v-for="(seat, j) in col"
                      :key="j"
                    >
                      <!-- Acà voy a ir obteniendo los asientos de atras hacia adelante de una de las 5 columnas-->
                      <!-- <template > -->
                      <template v-if="seat !== null">
                        <!-- baño -->
                        <template v-if="seat.asiento.includes('B')">
                          <div
                            style="height: 33px"
                            class="seatWidth d-flex align-center justify-center grey darken-4 elevation-1 white--text mb-2 ml-1"
                          >
                            <span>WC</span>
                          </div>
                        </template>
                        <div
                          v-else-if="seat.asiento === '' || seat.asiento === '%'"
                          style="height: 33px"
                          class="seatWidth"
                        /> 
                        <v-btn
                          v-else-if="
                            petSeatIsInshoppingCart(
                              seat.tipo,
                              seat.asiento,
                              data.pisos[selectedFloor].piso
                            ) > -1
                          "
                          fab
                          text
                          small
                          class="mx-0 my-0 seatBtn seatWidth"
                          disabled>
                          <seat
                            :seatNumber="seat.asiento"
                            :floor="data.pisos[selectedFloor].piso"
                            type="pet-taken"
                          />
                        </v-btn>                      
                        <v-btn
                          v-else-if="
                            seatIsInshoppingCart(
                              seat,
                              data.pisos[selectedFloor].piso
                            ) > -1
                          "
                          fab
                          text
                          small
                          class="mx-0 my-0 seatBtn seatWidth"
                          @click="
                            selectSeat(seat, data.pisos[selectedFloor].piso)
                          "
                        >
                          <seat
                            :seatNumber="seat.asiento"
                            :floor="data.pisos[selectedFloor].piso"
                            type="taken"
                          />
                        </v-btn>
                        <v-btn
                          v-else-if="seat.estado === 'ocupado'"
                          fab
                          text
                          small
                          class="mx-0 my-0 seatBtn seatWidth"
                          disabled
                        >
                          <seat
                            :seatNumber="seat.asiento"
                            :floor="data.pisos[selectedFloor].piso"
                            type="occupied"
                          />
                        </v-btn>
                        <v-btn
                          v-else-if="seat.estado === 'pet-busy'"
                          fab
                          text
                          small
                          class="mx-0 my-0 seatBtn seatWidth"
                          disabled
                        >
                          <seat
                            :seatNumber="seat.asiento"
                            :floor="data.pisos[selectedFloor].piso"
                            type="pet-occupied"
                          />
                        </v-btn>
                        <v-btn
                          v-else-if="seat.estado === 'pet-free'"
                          fab
                          text
                          small
                          class="mx-0 my-0 seatBtn seatWidth"
                          disabled
                        >
                          <seat
                            :seatNumber="seat.asiento"
                            :floor="data.pisos[selectedFloor].piso"
                            type="pet-free"
                          />
                        </v-btn>                                              
                        <v-btn
                          v-else
                          fab
                          text
                          small
                          class="mx-0 my-0 seatBtn seatWidth"
                          @click="
                            selectSeat(seat, data.pisos[selectedFloor].piso)
                          "
                        >
                          <seat
                            :seatNumber="seat.asiento"
                            type="free"
                            :floor="data.pisos[selectedFloor].piso"
                          />
                        </v-btn>
                      </template>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
          <v-col cols="4" md="4" class="left-border">
            <div class="d-flex flex-column" style="height: 100%">
              <h2 class="text-center mb-5">{{ $t('seat_title') }}</h2>
              <v-row justify="center">
                <v-col cols="10">
                  <div>
                    <template>
                    <div
                      class="d-flex justify-start my-4 mx-12"
                      v-for="(item, index) in seatsImg"
                      :key="index"
                    >
                      <div style="width: 35px">
                        <v-img
                          width="60"
                          :src="
                            require(`../../../../../static/logos/seats/${item.number}.png`)
                          "
                          contain
                        />
                      </div>
                      <h3 class="ml-1">
                        {{ $t(item.text) }}
                      </h3>
                    </div>
                    </template>
                    <template v-if="item.mascota === '1'">
                    <div                      
                      class="d-flex justify-start my-4 mx-12"
                      v-for="(item, index) in seatsPetImg"
                      :key="index"                      
                    >
                      <div style="width: 35px">
                        <v-img
                          width="60"
                          :src="
                            require(`../../../../../static/logos/seats/${item.number}.png`)
                          "
                          contain
                        />
                      </div>
                      <h3 class="ml-1">
                        {{ $t(item.text) }}
                      </h3>
                    </div>
                    </template>
                    <template v-if="selectedSeats.length > 0">
                      <strong class="d-block">Total</strong>
                      <div class="text-right">
                        <hr />
                        <span
                          :key="seat.id + index"
                          v-for="(seat, index) in selectedSeats"
                          class="d-flex align-center justify-end"
                        >
                          <span class="mr-1">{{ seat.servicioNombre }}</span
                          >-
                          <strong class="ml-1"
                            >${{
                              seat.tomadoPromo ? seat.totalPromo : seat.tarifa
                            }}</strong
                          >
                          <v-btn
                            icon
                            color="blue"
                            @click="
                              seatForDetail = seat
                              seatDetail = true
                            "
                          >
                            <v-icon>mdi-eye</v-icon>
                          </v-btn>
                          <v-btn
                            icon
                            color="orange"
                            v-if="seat.tipo != 'pet'" 
                            @click="deleteSelectedSeat(seat)"
                          >                         
                          <v-icon>clear</v-icon>
                          </v-btn> 
                          <img v-if="seat.tipo === 'pet'" 
                          src="../../../../../static/logos/seats/icono_pata_verde.svg"
                          class="service-pet-image"/>                        
                        </span>
                        <hr />
                        <strong>{{ totalAmount | currency }}</strong>
                      </div>
                    </template>
                    <template v-if="confirmationSeats.length > 0 && !hasVuelta">
                      <div
                        class="text-right"
                        v-for="(seat, i) in confirmationSeats"
                        :key="i"
                      >
                        <strong class="d-block orange--text">
                          {{ setBannerText(seat) }}
                        </strong>
                        <hr v-if="i === 0" />
                        <span class="d-block body-2">
                          Total a pagar
                          <strong class="d-block">
                            ${{ seat.totalPromo }}
                          </strong>
                        </span>
                        <v-btn
                          color="orange"
                          small
                          class="white--text my-3"
                          @click="confirmationAmount(seat)"
                        >
                          Agregar
                        </v-btn>
                        <hr />
                      </div>
                    </template>
                  </div>
                </v-col>
              </v-row>
              <div class="align-self-end justify-self-end mr-4">
                <v-row class="align-end">
                  <v-col class="d-flex align-end justify-end">
                    <v-btn
                      outlined
                      :disabled="!selectedSeats.length > 0"
                      @click="deleteSeats"
                      >{{ $t('cancel') }}</v-btn
                    >
                  </v-col>
                  <v-col class="d-flex align-end justify-end">
                    <v-btn
                      @click="showModal"
                      class="white--text"
                      color="orange"
                      :disabled="!selectedSeats.length > 0"
                      >{{ $t('continue') }}</v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog
        v-model="dialogPet"
        transition="dialog-bottom-transition"        
        max-width="400">
        <v-card class="modalPet">
          <v-card-text> 
            <v-row justify="end"> 
              <v-btn icon @click.native="dialogPet = false" dark>
                <v-icon>close</v-icon>
              </v-btn>
            </v-row>
            <v-row justify="center">
              <img 
                src="../../../../../static/logos/seats/pet-alert.png"
                width="120px"/> 
            </v-row> 
            <p style="padding-top:20px;color:white;">
              Estas eligiendo un asiento dentro del espacio destinado a mascotas a bordo.
            </p>
            <p style="color:white;">¿Quieres continuar y reservarlo?</p>
            <v-container>
              <v-btn
                @click="selectBusSeatPet()"
                class="white--text"
                color="#5089BC"
                >{{ $t('continue') }}</v-btn
              >           
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- .Grid end-->
    </v-card>
  </div>
</template>
<script>
import Dialog from '@/views/Services/stepper/List/ContinueDialog'
import SeatDetail from '@/views/Services/stepper/List/SeatDetail'
import ServicesListPanel from '@/components/Banners/ServicesListPanel'
import seat from '@/views/Services/stepper/List/Seat'
import scrollAnimation from '@/helpers/scrollAnimation'
import confirmationAmount from '@/helpers/updateConfirmationTicket'
import { mapGetters } from 'vuex'
import deleteSeat from '@/helpers/deleteSeat'
import API from '@/services/api/seats'
import _ from 'lodash'
// import moment from 'moment'

export default {
  props: [
    'item',
    'isXs',
    'back',
    'fechaSubida',
    'fechaIda',
    'fechaVuelta',
    'ciudadOrigen',
    'ciudadDestino'
  ],
  data() {
    return {
      dialogPet: false,
      petData:{
        seatData : {}, piso : 0
      },
      //confirmationSeats: [],
      seatDetail: false,
      seatForDetail: {},
      seatImageBase: '../../../../../static/logos/seats/',
      seatsImg: [
        { text: 'available_seats', number: 'seat-free' },
        { text: 'selected_seats', number: 'seat-taken' },
        { text: 'reserved_seats', number: 'seat-busy' }
      ],
      seatsPetImg: [
        { text: 'available_pet_seats', number: 'seat-pet-free' },
        { text: 'selected_pet_seats', number: 'seat-pet-taken' },
        { text: 'reserved_pet_seats', number: 'seat-pet-busy' }
      ],
      dialog: false,
      messageType: false,
      floorArray: [0],
      selectedFloor: 0,
      data: {},
      serviceData: {},
      loadingSeats: false,
      map: [],
      bus: {
        grilla: []
      },
      confirmTicketDialog: false,
      addedSeat: {}
    }
  },
  components: {
    seat,
    Dialog,
    SeatDetail,
    ServicesListPanel
  },
  mounted() {
    this.getSeats(this.item)
  },
  watch: {
    item() {
      //console.log('watch', this.item)
      this.getSeats(this.item)
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seats'],
      confirmationSeats: ['seatsWithPromoNotSelected'],
      totalAmount: ['seatsTotalAmount'],
      seatsByTravel: ['seatsByTravel'],
      hasVuelta: ['hasVuelta'],
      floorBanner: ['getServiceFloorBanners']
    }),
    getSelectedFloor() {
      const pisos = this.data.pisos
      const selected = this.selectedFloor
      const piso = pisos.filter(item => {
        return item.piso === selected
      })[0]
      //console.log('piso', piso)
      return piso
    }
  },
  methods: {
    confirmationAmount,
    confirmationAmountFromDialog() {
      confirmationAmount(this.addedSeat)
    },
    async deleteSelectedSeat(seat) {
      try {
        this.deleting = true
        const index = this.selectedSeats.findIndex(item => item.id === seat.id)
        if (index > -1) {
          await deleteSeat(index)
        }
        if(seat.tipo === 'asociado'){
         const index = this.selectedSeats.findIndex(
            item =>
              item.piso === seat.piso &&
              item.servicio === seat.servicio &&
              item.fecha === seat.fecha &&
              item.origen === seat.origen &&
              item.destino === seat.destino &&
              item.integrador === seat.integrador &&
              item.empresa === seat.empresa &&
              item.asiento === seat.asientoAsociado &&
              item.tipo === 'pet' 
          )
          if (index > -1) {
            await deleteSeat(index)
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
    async deleteSeats() {
      const lenght = this.selectedSeats.length - 1
      for (let index = lenght; index >= 0; index--) {
        await deleteSeat(index)
      }
    },
    setBannerText(seat) {
      const content = this.floorBanner[0].contenido
      const price =
        parseInt(seat.totalPromo.split('.').join('')) -
        parseInt(seat.tarifa.split('.').join(''))
      const priceText = this.$filters.currency(price)
      let result = content
      if (content.includes('${1}')) {
        result = content.replace('${1}', priceText)
      }
      return result
    },
    createDataForRequest() {
      this.serviceData = {
        empresa: this.data.empresa,
        servicio: this.data.idServicio,
        elementId: this.data.id,
        fecha: this.data.fechaSalida,
        fechaLlegada: this.data.fechaLlegada,
        fechaPasada: this.data.fechaSalida,
        fechaServicio: this.data.fechaServicio,
        horaSalida: this.data.horaSalida,
        horaLlegada: this.data.horaLlegada,
        origen: this.data.idTerminalOrigen,
        destino: this.data.idTerminalDestino,
        integrador: this.data.integrador,
        terminalLlegada: this.data.terminaLlegada,
        terminalOrigen: this.data.terminalOrigen,
        terminalDestino: this.data.terminalDestino,
        terminalSalida: this.data.terminalSalida,
        pisos: this.data.pisos
      }
      return this.serviceData
    },
    seatIsInshoppingCart(seatData, piso) {
      const index = this.selectedSeats.findIndex(
        item =>
          item.piso === piso &&
          item.servicio === this.serviceData.servicio &&
          item.fecha === this.serviceData.fecha &&
          item.origen === this.serviceData.origen &&
          item.destino === this.serviceData.destino &&
          item.integrador === this.serviceData.integrador &&
          item.empresa === this.serviceData.empresa &&
          seatData.asiento === item.asiento &&
          seatData.tipo != 'pet' 
        // moment().diff(moment(item.fechaTomada), 'minutes') < 15
      )
      return index
    },
    petSeatIsInshoppingCart(tipo, asiento, piso) {
      const index = this.selectedSeats.findIndex(
        item =>
          item.piso === piso &&
          item.servicio === this.serviceData.servicio &&
          item.fecha === this.serviceData.fecha &&
          item.origen === this.serviceData.origen &&
          item.destino === this.serviceData.destino &&
          item.integrador === this.serviceData.integrador &&
          item.empresa === this.serviceData.empresa &&
          asiento === item.asiento &&
          tipo === 'pet' 
        // moment().diff(moment(item.fechaTomada), 'minutes') < 15
      )
      return index
    },
    closeDialog({ ok }) {
      this.dialog = false
      if (ok) {
        this.$emit('confirm')
      }
    },
    searchSeats(type) {
      const result = this.seatsByTravel(type).filter(item => {
        return (
          item.fechaIda === this.fechaIda &&
          item.fechaVuelta === this.fechaVuelta &&
          item.ciudadOrigen === this.ciudadOrigen &&
          item.ciudadDestino === this.ciudadDestino
        )
      })
      return result.length > 0
    },
    showModal() {
      if (this.hasVuelta) {
        const hasBackServices = this.searchSeats(true)
        const hasGoServices = this.searchSeats()
        if (!hasBackServices && !hasGoServices) {
          if (this.$store.state.services.tab === 'tab-Vuelta') {
            this.$emit('confirm')
          } else {
            this.$store.dispatch('SET_SERVICE_TAB', { tab: 'tab-Vuelta' })
            scrollAnimation('#serviceToolbar')
          }
        } else if (!hasBackServices && hasGoServices) {
          if (this.$store.state.services.tab === 'tab-Vuelta') {
            this.messageType = true
            this.dialog = true
          } else {
            this.$store.dispatch('SET_SERVICE_TAB', { tab: 'tab-Vuelta' })
            scrollAnimation('#serviceToolbar')
          }
        } else if (hasBackServices && !hasGoServices) {
          if (this.$store.state.services.tab === 'tab-Ida') {
            this.messageType = false
            this.dialog = true
          } else {
            this.$store.dispatch('SET_SERVICE_TAB', { tab: 'tab-Ida' })
            scrollAnimation('#serviceToolbar')
          }
        } else {
          this.$emit('confirm')
        }
      } else {
        this.$emit('confirm')
      }
    },
    selectSeat(seatData, piso) {      
      const seatIndex = this.seatIsInshoppingCart(seatData, piso)
      if(seatData.tipo === 'asociado' && seatIndex == -1){
        const seatList = this.seatsByTravel(this.back)
        if(seatList.length < 3){
          this.petData.seatData = seatData;
          this.petData.piso = piso;
          this.dialogPet = true;
        }else{
          this.$notify({
            group: 'load',
            title: 'No puede tomar este asiento.',
            type: 'info'
          })
        }
      }else{
        this.selectBusSeat(seatData, piso)
      }
    },   
    selectBusSeatPet(){
      this.selectBusSeat(this.petData.seatData, this.petData.piso)
      this.dialogPet = false;    
      this.petData.seatData = {}
      this.petData.piso = 0
    },
    selectBusSeat(seatData, piso) {      
      let seat = seatData.asiento;
      const index = this.data.pisos.length > 1 ? piso : 0
      const seatIndex = this.seatIsInshoppingCart(seatData, piso)
      const floorData = {
        ...this.serviceData,
        servicioNombre: this.serviceData.pisos[index].servicio,
        tarifa: this.serviceData.pisos[index].tarifaInternet,
        tarifaNormal: this.serviceData.pisos[index].tarifa,
        monto: this.serviceData.pisos[index].tarifaInternet,
        precio: this.serviceData.pisos[index].tarifaInternet,
        clase: this.serviceData.pisos[index].clase,
        bus: this.serviceData.pisos[index].busPiso,
        hasPromo: this.serviceData.pisos[index].confirmation.idaVuelta,
        totalPromo: this.serviceData.pisos[index].confirmation.tarifaTotal,
        tomadoPromo: false,
        fechaSubida: this.fechaSubida,
        ciudadOrigen: this.ciudadOrigen,
        ciudadDestino: this.ciudadDestino,
        fechaIda: this.fechaIda,
        fechaVuelta: this.fechaVuelta,
        descuento: 0
        // fechaTomada: moment.now()
      }
      //console.log("index", index);
      //console.log("seatIndex", seatIndex);
      //console.log("floorData", floorData);
      //console.log("piso", piso);
      //console.log("indexes", indexes);      
      if (seatIndex > -1) {
        this.leverageSeat(
          { ...floorData, asiento: seat, piso },
          seatIndex
        )
        console.log('Fin libera asiento')
        this.$store.dispatch('DELETE_SEAT', { seat: seatIndex })
      } else {
        this.takeSeat({ ...floorData,tipo : seatData.tipo, asiento: seat, asientoAsociado : seatData.asientoAsociado, piso })
      }
      if(seatData.tipo === 'asociado'){
         let seatIndexAsociado = this.petSeatIsInshoppingCart('pet', seatData.asientoAsociado, piso)
         if (seatIndexAsociado > -1) {
          console.log('Inicio libera asiento pet')
          this.leverageSeat(
            { ...floorData, asiento: seatData.asientoAsociado, piso },
            seatIndexAsociado
          )
          console.log('Fin libera asiento pet')
          this.$store.dispatch('DELETE_SEAT', { seat: seatIndexAsociado })
        } else {
          this.takeSeat({ ...floorData,tipo : 'pet', asiento: seatData.asientoAsociado, asientoAsociado : seat, piso })
        }
      }
    },
    async takeSeat(params) {
      const seatList = this.seatsByTravel(this.back)
      if (seatList.length > 3) {
        this.$notify({
          group: 'error',
          title: this.$t('seats_max'),
          type: 'error'
        })
        return
      }
      this.$notify({
        group: 'load',
        title: this.$t('taking_seat'),
        type: 'info'
      })
      this.loadingSeats = true
      const requestParams = this.createRequestParams(params)
      console.log(requestParams)
      const response = await API.takeSeat(requestParams)
      this.loadingSeats = false
      if (!response.data > 0) {
        this.$notify({
          group: 'error',
          title: this.$t('seats'),
          text:
            this.$t('seats_error1') +
            requestParams.asiento +
            this.$t('seats_error2'),
          type: 'error'
        })       
        this.$forceUpdate()
      } else {
        this.getSeats(this.item)
        const seat = Object.assign({ vuelta: this.back }, params)
        seat.id = seat.elementId + seat.piso + seat.asiento
        this.$store.dispatch('SET_SEAT', { seat })
        if (seat.hasPromo && !seat.tomadoPromo && !this.hasVuelta) {
          this.addedSeat = seat
          this.confirmTicketDialog = true
        }
      }
    },
    async leverageSeat(params) {
      this.loadingSeats = true
      const requestParams = this.createRequestParams(params)
      console.log(requestParams)
       this.$notify({
        group: 'load',
        title: this.$t('releasing_seat'),
        type: 'info'
      }) 
      const mapResponse = await API.freeSeat(requestParams) 
      this.loadingSeats = false
      if(mapResponse.data > 0){
        this.getSeats(this.item)
      }
    },
    createRequestParams(params) {
      const requestParams = _.pick(params, [
        'servicio',
        'fecha',
        'origen',
        'destino',
        'integrador',
        'asiento'
      ])
      requestParams.asiento =
        params.piso > 0
          ? (parseInt(params.asiento)).toString()
          : params.asiento
      return requestParams
    },
    async getSeats(item) {
      this.floorArray = item.pisos.length > 1 ? [0, 1] : [0]
      this.selectedFloor = item.pisos[0].piso
      this.data = item  
      /*
      if (this.bus.grilla.length > 0) {
        return
      }
      */
      this.loadingSeats = true
      this.createDataForRequest()
      const mapResponse = await API.getMapVertical({
        idServicio: item.idServicio,
        tipoBusPiso1: item.busPiso1,
        tipoBusPiso2: item.busPiso2,
        fechaServicio: item.fechaServicio,
        idOrigen: item.idTerminalOrigen,
        idDestino: item.idTerminalDestino,
        integrador: item.integrador,
        clasePiso1 : item.pisos[0].clase,
        clasePiso2 : item.pisos.length > 1 ? item.pisos[0].clase : ""
      })
      this.map = mapResponse.data   
      const floors = Object.keys(this.map)
      let grilla = []
      const map = JSON.parse(JSON.stringify(this.map)) 
      floors.forEach((key) => {
        grilla.push({ floor: key, grid: map[key] })
      }) 
      //console.log('grilla', grilla)
      this.bus = { grilla }
      this.loadingSeats = false
    }
  }
}
</script>
<style scoped>
.promotion-advice-floor {
  position: absolute;
  width: 200px;
  top: 57px;
  left: -67px;
  transform: rotate(-65deg);
}
@media (max-width: 400px) {
  .container {
    padding: 0px !important;
  }
}
.wcSize {
  width: 30px;
  fill: grey;
}
.left-border {
  border-left: 1.5px solid rgb(206, 204, 204);
}
.seatContinueButton {
  position: absolute;
  bottom: 0;
  right: 0;
}
.seatWidth {
  width: 45px;
}
.blank-seat-rem {
  margin-right: 1rem;
}
.modalPet{
  text-align:center;
  background: #85C4D7;
}
@media screen and (max-width: 1364px) {
  .seatWidth {
    width: 29px;
  }
  .blank-seat-rem {
    margin-right: 0.5;
  }
}

@media screen and (max-width: 1064px) {
  .blank-seat-rem {
    margin-right: 0;
  }
}
.service-pet-image {
  max-width: 24px;
  height: auto;
  margin-top: 0px;
}
</style>
