<template>
  <v-footer :padless="padless">
    <v-card flat tile width="100%" class="text-left white--text orange">
      <v-row class="px-7">
        <v-col cols="12" sm="12" md="3">
          <v-row>
            <v-col cols="12">
              <span class="body-1 d-block">Call Center</span>
              <p class="body-2"><v-icon dark>mdi-phone</v-icon> 600 600 0018</p>
            </v-col>
            <v-col cols="12">
              <span class="body-1 d-block">Escríbenos</span>
              <div class="d-flex align-center">
                <div>
                  <v-img src="../../static/logos/Iconos-33.png" height="20px" width="20px" />
                </div>
                <span id="infopullman" class="body-2">clientes@pullmanbus.cl</span>
              </div>
            </v-col>
            <v-col cols="12">
              <span class="body-1 d-block">Casa Matriz Pullman Bus</span>
              <div class="d-flex align-center">
                <div></div>
                <span class="body-2">
                  <v-icon dark>
                    mdi-map-marker
                  </v-icon>
                  San Borja 235, Estación Central, Santiago</span
                >
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-row>
            <v-col cols="12">
              <span class="body-1 d-block pb-3">
                Información al consumidor
              </span>
              <router-link to="/docs/rights" class="body-2 d-block footerLink">
                Conoce tus derechos
                <v-icon dark>mdi-chevron-right</v-icon>
              </router-link>
              <router-link to="/docs/privacy" class="body-2 d-block footerLink">
                Política de privacidad
                <v-icon dark>mdi-chevron-right</v-icon>
              </router-link>
              <router-link to="/docs/terms" class="body-2 d-block footerLink">
                Términos y condiciones de pasajes
                <v-icon dark>mdi-chevron-right</v-icon>
              </router-link>
            </v-col>
            <v-col class="my-0">
              <v-menu
                top
                offset-y
                style="display: flex; height: 100%; align-items: center;"
              >
                <template v-slot:activator="{ on }">
                  <v-btn class="white--text body-2 capitalize pa-0" text v-on="on">
                    Menu
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, i) in links"
                    :key="i"
                    :href="item.link"
                    :to="item.route ? { name: item.route } : undefined"
                    :target="item.link ? '_blank' : undefined"
                  >
                    <v-list-item-title>{{ item.title }} </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-row colum>
            <v-col>
              <span class="body-1 d-block text-center">
                Búscanos en
              </span>
              <span class="d-block mt-5 text-center px-6">
                <a
                  href="https://www.facebook.com/Pullman.cl"
                  target="_blank"
                  style="text-decoration: none"
                  ><v-icon size="40" dark>mdi-facebook</v-icon></a
                >
                <a
                  href="https://www.instagram.com/pullmanbus/"
                  target="_blank"
                  style="text-decoration: none"
                  ><v-icon size="40" dark>mdi-instagram</v-icon></a
                >
                <a
                  href="https://www.linkedin.com/company/22594345/admin/"
                  target="_blank"
                  style="text-decoration: none"
                  ><v-icon size="40" dark>mdi-linkedin</v-icon></a
                >
              </span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-row colum>
            <v-col>
              <span class="body-1 d-block text-center">Pago seguro</span>
              <v-img
                src="../../static/logos/web-pay-plus-white.png"
                height="100"
                position="center center"
                contain
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <div class="orange_dark px-5">
        <v-card-text class="white--text pb-1">
          <div :class="{ 'd-flex justify-space-between': !breakPoints }">
            <span>Todos los derechos reservados, {{ new Date().getFullYear() }}</span>
            <span :class="{ 'd-block': breakPoints }">
              Desarrollada por Wit innovación y tecnología spa
            </span>
          </div>

          <span class="caption">Version: {{ version }}</span>
        </v-card-text>
      </div>
    </v-card>
  </v-footer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['links'],
  data: () => ({
    icons: ['mdi-home', 'mdi-email', 'mdi-calendar', 'mdi-delete'],
    items: ['default', 'absolute', 'fixed'],
    padless: true,
    variant: 'default'
  }),
  computed: {
    ...mapGetters({ version: ['appVersion'] }),
    breakPoints() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return true
        default:
          return false
      }
    }
  }
}
</script>
<style scoped>
.footerLink {
  text-decoration: none;
  color: white;
  margin-bottom: 0.5rem;
}
#infopullman{
  margin-left: 4px;
}
</style>
