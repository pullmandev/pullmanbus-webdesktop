<template>
  <div>
    <v-container fluid>
      <!-- Card date passenger -->
      <v-card class="elevation-10">
        <v-card-text>
          <v-flex xs12 class="pt-3 pl-4">
            <v-card-text><h3>DATOS PASAJERO</h3></v-card-text>
          </v-flex>
          <v-layout row>
            <v-flex grow pa-1 xs3 class="pt-3 pl-4">
              <v-card class="elevation-0">
                <v-card-text>Nombre</v-card-text>
              </v-card>
            </v-flex>
            <v-flex shrink pa-1 xs3 class="pt-3">
              <v-card class="elevation-0">
                <v-card-text>Rut</v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow pa-1 xs3 class="pt-3">
              <v-card class="elevation-0">
                <v-card-text>Email</v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow pa-1 xs3 class="pt-3">
              <v-card class="elevation-0">
                <v-card-text>Movil</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex shrink pa-1 xs3 class="pt-1 pl-4 pb-5">
              <v-card class="elevation-0">
                <v-card-text>{{payment_info.completeName}}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow pa-1 xs3 class="pt-1">
              <v-card class="elevation-0">
                <v-card-text>{{payment_info.rut}}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex shrink pa-1 xs3 class="pt-1 pb-">
              <v-card class="elevation-0">
                <v-card-text>{{payment_info.email}}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex shrink pa-1 xs3 class="pt-1 pb-">
              <v-card class="elevation-0">
                <v-card-text>+569 {{payment_info.movil}}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <!-- Card date Ticket -->
      <v-card class="elevation-10 mt-5 pb-5">
        <v-card-text>
          <v-flex xs12 class="pt-3 pl-4">
            <v-card-text><h3>RESERVA IDA</h3></v-card-text>
          </v-flex>

          <v-layout row>
            <v-flex grow pa-1 xs3 class="pt-3 pl-4">
              <v-card class="elevation-0">
                <v-card-text>Fecha salida:
                  <br>{{getSeatInfo.fecha}}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow pa-1 xs3 class="pt-3">
              <v-card class="elevation-0">
                <v-card-text>Origen:
                  <br>{{getSeatInfo.fromCity}}
                  </v-card-text>
              </v-card>
            </v-flex>
            <v-flex shrink pa-1 xs3 class="pt-3">
              <v-card class="elevation-0">
                <v-card-text>Terminal de origen:
                  <br>{{getSeatInfo.terminalSalida}}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow pa-1 xs3 class="pt-3">
              <v-card class="elevation-0">
                <v-card-text>Cantidad de pasajes:
                  <br>0{{selectedSeats.length}}
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex shrink pa-1 xs3 class="pt-1 pl-4 pb-4">
              <v-card class="elevation-0">
                <v-card-text>Hora salida:
                  <br>{{getSeatInfo.hora}}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow pa-1 xs3 class="pt-1">
              <v-card class="elevation-0">
                <v-card-text>Destino
                  <br>{{getSeatInfo.toCity}}
                  </v-card-text>
              </v-card>
            </v-flex>
            <v-flex grow pa-1 xs3 class="pt-1">
              <v-card class="elevation-0">
                <v-card-text>Terminal de Destino:
                  <br>{{getSeatInfo.terminalLlegada}}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex shrink pa-1 xs3 class="pt-1">
              <v-card class="elevation-0">
                <v-card-text>Asientos
                  <br>{{getSeatInfo.seats}}
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <div class="mt-5">
        <v-btn color="primary" class="white--text" @click="validateSeats">Continuar</v-btn>
        <v-btn style="background-color:#a0a0a0;" class="white--text" @click="$store.dispatch('SET_STEP', {step: 1});">Cancelar</v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      name: '',
      rut: '',
      email: ''
    }
  },
  methods: {
    async validateSeats () {
      this.$store.dispatch('SET_STEP', {step: 3})
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seats'],
      payment_info: ['payment_info'],
      searching: ['getSearching']
    }),

    getSeatInfo () {
      let seatsList = ''
      this.selectedSeats.forEach((seat, index) => {
        const seatByFloor = seat.piso > 0 ? `${seat.asiento}P2` : seat.asiento
        const dot = index === 0 ? '' : '-'
        seatsList = `${seatsList} ${dot} ${seatByFloor}`
      })
      return {
        fromCity: this.searching.from_city.nombre,
        toCity: this.searching.to_city.nombre,
        fecha: this.selectedSeats[0].fecha,
        hora: this.selectedSeats[0].horaSalida,
        terminalSalida: this.selectedSeats[0].terminalSalida,
        terminalLlegada: this.selectedSeats[0].terminalLlegada,
        seats: seatsList
      }
    }
  }
}
</script>

