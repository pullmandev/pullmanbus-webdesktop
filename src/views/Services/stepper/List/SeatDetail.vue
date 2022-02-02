<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>

      <v-list disabled>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-icon class="my-0 align-self-center">
              <v-icon color="blue" v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content class="py-0">
              <v-list-item-title>
                <v-row no-gutters>
                  <v-col>
                    <span class="title">{{ item.text }}</span>
                  </v-col>
                  <v-col class="d-flex align-center">
                    <span class="text-center"
                      >{{ item.value }}
                      <span v-if="item.promo" style="font-size: 0.7rem">(CON PROMO)</span>
                    </span>
                  </v-col>
                </v-row>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="orange white--text"
          @click="
            discardSeat(seat)
            dialog = false
          "
        >
          Eliminar
        </v-btn>

        <v-btn color="orange white--text" @click.native="dialog = false">
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'SeatDetail',

  props: {
    open: {
      type: Boolean,
      required: true
    },
    seat: {
      type: Object
    },
    discardSeat: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      items: []
    }
  },

  computed: {
    title() {
      return this.seat?.count > 1 ? 'Datos de los asientos' : 'Datos del asiento'
    },
    dialog: {
      get() {
        return this.open
      },
      set(value) {
        this.$emit('update:open', value)
      }
    }
  },

  watch: {
    open(val) {
      if (!val) {
        this.items = []
        return
      }

      const seat = this.seat

      let text = `Asiento${seat.count > 1 ? 's' : ''}`
      let value = seat.asiento.join(', ')
      this.items.push({ text, value, icon: 'mdi-seat' })

      text = 'Piso'
      value = seat.piso + 1
      this.items.push({ text, value, icon: 'mdi-floor-plan' })

      text = 'Clase'
      value = seat.servicioNombre
      this.items.push({ text, value, icon: 'mdi-room-service' })

      text = 'Valor'
      value = seat.tomadoPromo ? `$ ${seat.totalPromo}` : `$ ${seat.tarifa}`

      this.items.push({
        text,
        value,
        icon: 'mdi-cash',
        promo: seat.tomadoPromo
      })
    }
  }
}
</script>
