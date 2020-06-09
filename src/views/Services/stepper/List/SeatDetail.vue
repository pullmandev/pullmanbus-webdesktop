<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title>Datos del asiento</v-card-title>
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
                      <span v-if="item.promo" style="font-size: 0.7rem"
                        >(CON PROMO)</span
                      >
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
        <v-btn color="orange white--text" @click.native="dialog = false">
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['open', 'seat'],
  data() {
    return {
      items: []
    }
  },
  computed: {
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
      console.log('detail', seat)
      this.items = []
      let text = 'Asiento'
      let value = seat.piso > 0 ? parseInt(seat.asiento) + 20 : seat.asiento
      this.items.push({ text, value, icon: 'mdi-seat' })
      text = 'Piso'
      value = seat.piso + 1
      this.items.push({ text, value, icon: 'mdi-floor-plan' })
      text = 'Clase'
      value = seat.servicioNombre
      this.items.push({ text, value, icon: 'mdi-room-service' })
      text = 'Valor'
      if (seat.tomadoPromo) {
        value = `$ ${seat.totalPromo}`
      } else {
        value = `$ ${seat.tarifa}`
      }
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
