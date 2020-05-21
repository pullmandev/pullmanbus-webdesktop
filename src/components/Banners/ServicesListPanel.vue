<template>
  <v-dialog
    v-model="promotion"
    overlay-color="blue_dark"
    :max-width="700"
    content-class="rounded-dialog-banner"
    persistent
  >
    <v-card color="white">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div style="width: 350px">
          <v-img
            src="../../../static/images/Imagen-descuento.png"
            height="350px"
          ></v-img>
        </div>
        <v-row no-gutters>
          <v-col
            cols="12"
            class="d-flex flex-column justify-end align-center text-center"
          >
            <p class="headline d-block">Promocion</p>
            <p class="title px-3">
              Compra tu pasaje por confirmar a un precio preferente ${{ price }}
            </p>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-around align-center">
            <v-btn outlined @click="promotion = false">Cancelar</v-btn>
            <v-btn color="orange" class="white--text" @click="accept">
              Aceptar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['open', 'price'],
  computed: {
    promotion: {
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
      this.promotion = false
    }
  }
}
</script>
<style>
.rounded-dialog-banner {
  border-radius: 40px !important;
  overflow: hidden;
}
</style>
