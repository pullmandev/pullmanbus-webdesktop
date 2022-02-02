<template>
  <v-footer :padless="true">
    <v-card flat tile width="100%" class="py-5 text-left white--text orange">
      <v-row class="px-7">
        <v-col cols="12" sm="12" md>
          <div class="py-5" style="border-bottom: 2px dotted white">
            <div class="contact">
              <div class="data">
                <v-icon class="icon" dark>mdi-phone</v-icon>
                <span>Call Center: 600 600 0018</span>
              </div>

              <div class="data ">
                <img src="../../../static/logos/Iconos-33.png" width="20px" />
                <span class="body-2">{{ $t('contact') }}: info@pullmanbus.cl</span>
              </div>

              <div class="data">
                <v-icon class="icon" dark>mdi-map-marker</v-icon>
                <span>{{ $t('footer_text.address') }}</span>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md>
          <div class="d-flex align-center">
            <img
              src="../../../static/images/footer/icono_consulta_fotter.png"
              width="80"
              position="center center"
              contain
            />
            <v-icon class="ma-0" size="50" style="opacity: 0.6; width: 15px;" left dark
              >mdi-menu-left</v-icon
            >
            <div
              style="padding: 0.7rem 0.9rem; border-radius: 10px; border: 2px solid #FFFFFF7F"
            >
              <router-link
                v-for="(page, i) in information_pages"
                :to="page.link"
                :key="i"
                class="body-2 d-block footerLink"
              >
                <v-icon size="20" style="opacity: 0.6;" left dark>mdi-magnify</v-icon>
                {{ $t(page.text) }}
              </router-link>
            </div>
          </div>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-row colum>
            <v-col>
              <span class="body-1 d-block text-center">{{ $t('footer_text.pay') }}</span>
              <v-img
                src="../../../static/logos/logo_webpay.png"
                height="70"
                position="center center"
                contain
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-row colum>
            <v-col>
              <span class="body-1 d-block text-center">
                {{ $t('footer_text.search_us') }}
              </span>
              <span class="d-block text-center px-6">
                <a
                  href="https://www.facebook.com/Pullman.cl"
                  target="_blank"
                  style="text-decoration: none"
                  ><v-icon size="40" dark>mdi-facebook</v-icon></a
                >
                <a
                  href="https://www.instagram.com/pullman.cl/"
                  target="_blank"
                  style="text-decoration: none"
                  ><v-icon size="40" dark>mdi-instagram</v-icon></a
                >
              </span>
              <div class="enterprise-container">
                <span>{{ $t('footer_text.others') }}</span>
                <div class="logos_container">
                  <a href="http://www.pullmancargo.cl/" target="_blank">
                    <img src="../../../static/logos/logo_cargo.png" width="100px" />
                  </a>
                  <div class="separator"></div>
                  <a href="https://tandemindustrial.cl/" target="_blank">
                    <img src="../../../static/logos/logo_tandem.png" width="100px" />
                  </a>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
import links from '@data/menu'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      icons: ['mdi-home', 'mdi-email', 'mdi-calendar', 'mdi-delete'],
      items: ['default', 'absolute', 'fixed'],
      variant: 'default',
      links,
      information_pages: [
        {
          link: '/docs/FAQS',
          text: 'faq'
        },
        {
          link: '/docs/rights',
          text: 'your_rights'
        },
        {
          link: '/docs/privacy',
          text: 'footer_text.privacy'
        },
        {
          link: '/docs/terms',
          text: 'footer_text.terms'
        }
      ]
    }
  },

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

<style lang="scss" scoped src="./Footer.scss" />
