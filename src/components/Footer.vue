<template>
  <v-footer :padless="padless">
    <v-card flat tile width="100%" class="text-left white--text orange">
      <v-row class="px-7">
        <v-col cols="3">
          <v-row>
            <v-col cols="12">
              <span class="body-1 d-block">Call Center</span>
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
            <v-col cols="12">
              <span class="body-1 d-block">Casa Matriz Pullman Bus</span>
              <div class="d-flex align-center">
                <div>
                </div>
                <span class="body-2">San Borja 235, Estación Central, Santiago</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row column>
            <v-col cols="12">
              <span class="body-1 d-block">
                Información al consumidor
              </span>
              <span class="body-2 d-block">
                Conoce tus derechos
                <v-icon dark>mdi-chevron-right</v-icon>
              </span>
              <span class="body-2 d-block">
                Política de privacidad
                <v-icon dark>mdi-chevron-right</v-icon>
              </span>
              <span class="body-2 d-block">
                Tñerminos y condiciones de pasajes
                <v-icon dark>mdi-chevron-right</v-icon>
              </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row colum>
            <v-col>
              <span class="body-1 d-block text-center">Pago seguro</span>
              <v-img
                src="../../static/logos/web-pay-plus-white.png"
                height="100"
                position="center center"
                contain
              />

              <span class="body-1 d-block text-center">
              Búscanos en
              </span>
              <span class="body-1 d-block text-center">
                <v-icon dark class="ml-1">mdi-facebook</v-icon>
                <v-icon dark class="ml-1">mdi-instagram</v-icon>
                <v-icon dark class="ml-1">mdi-youtube</v-icon>
              </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <div class="orange_dark px-5">
        <v-card-text class="white--text">
          Todos los derechos reservados, {{ new Date().getFullYear() }}
          <span class="float-right">
              Desarrollada por WIT Innovación y Tecnología SPA
              </span>

        </v-card-text>
      </div>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ['mdi-home', 'mdi-email', 'mdi-calendar', 'mdi-delete'],
    items: ['default', 'absolute', 'fixed'],
    padless: true,
    variant: 'default'
  })
}
</script>
