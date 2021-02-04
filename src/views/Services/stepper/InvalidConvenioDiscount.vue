<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card>
        <v-card-title class="title"
          >No se aplicará descuento a todos los boletos</v-card-title
        >
        <v-card-text
          >Los descuentos por convenios estarán desactivados para los asientos
          con promoción de boleto de regreso.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange white--text" @click="accept">Continuar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['open'],
  computed: {
    ...mapGetters(['getServiceBanners']),
    dialog: {
      get() {
        return this.open
      },
      set(value) {
        this.$emit('update:open', value)
      }
    }
  },
  methods: {
    accept() {
      this.$emit('accept')
      this.dialog = false
    }
  }
}
</script>
