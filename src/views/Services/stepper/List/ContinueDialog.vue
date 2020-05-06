<template>
  <v-dialog v-model="open" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">
        No ha seleccionado {{ type ? 'vuelta' : 'ida' }}
      </v-card-title>
      <v-card-text>
        <p class="pa-3">
          ¿Desea continuar la compra sin haber seleccionado un boleto para la
          fecha de {{ type ? 'regreso' : 'ida' }}?
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange white--text" @click.native="closeDialog(true)">{{
          $t('continue')
        }}</v-btn>
        <v-btn
          color="white"
          class="orange--text"
          @click.native="closeDialog(false)"
        >
          No, reservar {{ type ? 'vuelta' : 'ida' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['open', 'type'],
  methods: {
    closeDialog(ok) {
      this.$emit('close', { ok, type: this.type })
    }
  }
}
</script>
