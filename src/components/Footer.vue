<template>
  <v-footer :padless="padless">
    <v-card flat tile width="100%" class="text-left white--text orange">
      <v-row class="px-7">
        <v-col cols="3">
          <v-row>
            <v-col cols="12">
              <span class="body-1 d-block">Llámanos</span>
              <p class="body-2">
                <v-icon dark>mdi-phone</v-icon> +58 9 1234 5678
              </p>
            </v-col>
            <v-col cols="12">
              <span class="body-1 d-block">Escríbenos</span>
              <div class="d-flex align-center">
                <div>
                  <v-img
                    src="../../static/logos/Iconos-33.png"
                    height="30"
                    width="30"
                  />
                </div>
                <span class="body-2">info@pullmanbus.cl</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row column>
            <v-col cols="12">
              <v-row class="pa-0 ma-0" no-gutters>
                <v-col
                  cols="12"
                  lg="6"
                  :key="index"
                  v-for="(item, index) in links"
                >
                  <span class="body-1 d-block">
                    {{ item.title }}
                    <v-icon dark>mdi-chevron-right</v-icon>
                  </span>
                </v-col>
                <v-col cols="12" lg="6">
                  <span class="body-1 d-block">
                    Información al consumidor
                    <v-icon dark>mdi-chevron-right</v-icon>
                  </span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row colum>
            <v-col>
              <span class="body-1 d-block">Pago seguro</span>
              <v-img
                src="../../static/logos/web-pay-plus-white.png"
                height="100"
                position="left center"
                contain
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <div class="orange_dark px-5">
        <v-card-text class="white--text">
          Todos los derechos reservados, {{ new Date().getFullYear() }}
          <span class="float-right">
            Siguenos en
            <v-icon dark class="ml-1">mdi-facebook</v-icon>
            <v-icon dark class="ml-1">mdi-instagram</v-icon>
            <v-icon dark class="ml-1">mdi-youtube</v-icon>
          </span>
        </v-card-text>
      </div>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  props: ['links'],
  data: () => ({
    icons: ['mdi-home', 'mdi-email', 'mdi-calendar', 'mdi-delete'],
    items: ['default', 'absolute', 'fixed'],
    padless: true,
    variant: 'default'
  })
}
</script>
