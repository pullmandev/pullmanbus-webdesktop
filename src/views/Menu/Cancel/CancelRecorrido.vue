<template>
  <v-container class="d-flex justify-center">
    <v-card max-width="1000" style="margin-top:60px">
      <v-toolbar color="orange" class="white--text elevation-0">
        <v-toolbar-title class="d-flex align-center">
          <v-icon dark>mdi-chevron-right-circle</v-icon>
          <h2 class="d-inline-flex flex-column text-left title" style="line-height: 20px">
            DEVOLUCIONES
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-container class="pt-0">
          <span class="body-2">
            Si compraste tu boleto antes de 26 de Agosto,
            <v-btn
              v-if="!user.usuario || !user.usuario.nombre"
              small
              text
              @click="openDialog('login')"
              class="header-text  pl-0  pr-2"
            >
              {{ $t('login') }}
            </v-btn>
            ingrese "Mi cuenta" y en "Devoluciones"
          </span>
        </v-container>
        <v-container class="pt-0">
          <span class="body-2">
            Si compraste tu boleto a partir de 26 de Agosto, ingrese al siguiente
            <a
              href="https://www.recorrido.cl/pullman-bus/es/ayuda/anular-pasajes"
              target="_blank"
            >
              Link </a
            >.
          </span>
        </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>
<script>
import openDialog from '@/helpers/openDialog'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    loginDialog: false
  }),

  computed: {
    ...mapGetters({
      user: ['userData']
    })
  },

  methods: {
    openDialog
  }
}
</script>
<style lang="scss"></style>
