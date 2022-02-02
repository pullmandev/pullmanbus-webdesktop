<template>
  <div class="main-header">
    <v-app-bar color="orange_dark" dark fixed class="xim-header">

      <div class="xim-desktop xim-horizontal">
        <div class="grupo-uno">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-btn text @click="$router.push({ path: '/' })">
          <div>
            <v-img src="../../../static/logos/pullmanbus_blanco.png" class="xim-logo-resposivo" />
          </div>
        </v-btn>
        </div>

        <div style="margin-top: -8px;" >
          <div class="d-flex justify-end">
            <div class="blue px-1" style="border-bottom-left-radius: 5px;">
              <a
                href="http://pullmanempresas.cl/"
                target="_blank"
                class="white--text header-text"
              >
                {{ $t('business_client') }}
              </a>
            </div>
          </div>
          <div class="d-flex align-end" style="margin-top: 4px; padding-right: 4px">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn small text v-on="on" style="max-width: 50px;">
                  <v-img
                    class="mx-0"
                    src="../../../static/logos/header/Iconos-25.png"
                    height="21"
                    width="20"
                  />
                  <!-- {{ $t($i18n.locale) }}
                  <v-icon>mdi-chevron-down</v-icon> -->
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in languageMenu"
                  :key="index"
                  @click="changeI18n(item)"
                >
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <div class="line-separator"></div>
            <v-btn
              text
              small
              class="header-text pl-0 pr-1"
              :to="{ name: 'ConfirmationServicesPanel' }"
            >
              <v-icon>mdi-chevron-right</v-icon>
              {{ $t('confirmation.header') }}
            </v-btn>
            <div class="line-separator"></div>
            <v-menu
              bottom
              offset-y
              style="display: flex; height: 100%; align-items: center;"
            >
              <!--template v-slot:activator="{ on }">
                <v-btn class="white--text" text v-on="on">
                  Menu
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
              </template-->
              <v-list>
                <v-list-item
                  v-for="(item, i) in links"
                  :key="i"
                  :href="item.link"
                  :to="item.route ? { name: item.route } : undefined"
                  :target="item.link ? '_blank' : undefined"
                >
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <template v-if="!user.usuario || !user.usuario.nombre">
              <v-btn
                small
                text
                @click="openDialog('login')"
                class="header-text  pl-0  pr-2"
              >
                <v-img
                  class="mx-2"
                  src="../../../static/logos/header/Iconos-24.png"
                  height="23"
                  width="23"
                />
                {{ $t('login') }}
              </v-btn>
            </template>

            <template v-else>
              <v-menu
                bottom
                offset-y
                style="display: flex; height: 100%; align-items: center;"
              >
                <template v-slot:activator="{ on }">
                  <v-btn small class="white--text header-text pl-0 pr-2" text v-on="on">
                    <v-img
                      class="mx-2"
                      src="../../../static/logos/header/Iconos-24.png"
                      height="30"
                      width="30"
                    />
                    <span class="hidden-sm-and-down header-text capitalize">{{
                      $t('my_account')
                    }}</span>
                    <v-icon>arrow_drop_down</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(route, i) in profileMenu"
                    :key="i"
                    @click="$router.push({ name: route.name })"
                  >
                    <v-list-item-title>{{ $t(route.title) }}</v-list-item-title>
                  </v-list-item>

                  <v-list-item @click="signOut">
                    <v-list-item-title>{{ $t('sign_out') }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>

            <!-- <v-btn small text class="pl-0 pr-1">
              <v-icon style="font-size: 32px;">mdi-cart-outline</v-icon>
            </v-btn> -->
          </div>
        </div>
      </div>

      <div class="xim-movile xim-horizontal">
        <v-row>
          <v-col cols="2" sm="2" md="2">
            <v-app-bar-nav-icon @click.stop="drawer =! drawer"></v-app-bar-nav-icon>
          </v-col>
          <v-col cols="6" sm="6" md="6">
                <v-btn 
                  class="xim-btn-header"
                  @click="$router.push({ path: '/' })">
                  <v-img 
                    src="../../../static/logos/pullmanbus_blanco.png" 
                    class="xim-movile-logo-header" 
                />
                </v-btn>
          </v-col>
          <v-col cols="4" sm="4" md="4">
            <template v-if="!user.usuario || !user.usuario.nombre">
              <v-btn
                text
                @click="openDialog('login')"
                class="xim-header-text"
              >{{ $t('login') }}
                <v-img
                  src="../../../static/logos/header/Iconos-24.png"
                  class="xim-ico-login"
                />
              </v-btn>
            </template>
            <template v-else>
            <v-menu
              bottom
              offset-y
              class="xim-menu"
            >
            <template v-slot:activator="{ on }">
              <v-btn class="white--text header-text pl-0 pr-2" text v-on="on">
                <v-img
                  class="mx-2 xim-usuario-logeado"
                  src="../../../static/logos/header/Iconos-24.png"
                  height="24"
                  width="24"
                />
                <span class="hidden-sm-and-down header-text capitalize">{{ $t('my_account') }}</span>
                <v-icon class="xim-header-icons">arrow_drop_down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(route, i) in profileMenu"
                :key="i"
                @click="$router.push({ name: route.name })"
              >
                <v-list-item-title>{{ $t(route.title) }}</v-list-item-title>
              </v-list-item>

              <v-list-item @click="signOut">
                <v-list-item-title>{{ $t('sign_out') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
          </v-col>
        </v-row>
        
       
        
        
        <!-- <template>
          <v-img
            class="xim-estatico"
            src="../../../static/logos/header/56.png"
          />
        </template> -->
      </div>

    </v-app-bar>
    <Drawer :open.sync="drawer" :links="links" />
    <SeatCart :open.sync="seatCart" />
  </div>
</template>
<script>
import Drawer from '@/components/Header/Drawer'
import SeatCart from '@/components/SeatCart'
import openDialog from '@/helpers/openDialog'
import links from '@data/menu'
import { mapGetters } from 'vuex'
export default {
  components: {
    Drawer,
    SeatCart
  },
  data: () => ({
    drawer: false,
    seatCart: false,
    loginDialog: false,
    profileMenu: [
      { title: 'my_profile', name: 'my_profile' },
      { title: 'my_purchases', name: 'purchases' },
      { title: 'cancellations', name: 'cancel_purchase' },
      { title: 'change_password', name: 'profile_pass' }
    ],
    links
  }),
  computed: {
    ...mapGetters({
      user: ['userData']
    }),
    languageMenu() {
      return [
        {
          title: this.$t('es'),
          lang: 'es',
          img: '/static/logos/header/Iconos-25.png'
        },
        {
          title: this.$t('en'),
          lang: 'en',
          img: '/static/logos/header/Iconos-24.png'
        }
      ]
    }
  },

  methods: {
    openDialog,
    signOut() {
      this.$store.dispatch('DELETE_USER')
      this.$router.push({ path: '/' })
    },
    changeI18n(item) {
      this.$i18n.locale = item.lang
    }
  }
}
</script>
<style lang="scss">
@media (max-width: 1024px) {
  .main-header header {
    a {
      text-decoration: none;
    }
    .header-text {
      font-size: 0.75rem;
    }
    .v-toolbar__content {
      // padding-top: 0;
      padding-right: 0;
    }
    .line-separator {
      height: 20px;
      width: 1px;
      background-color: white;
      margin: 0px 5px;
      margin-bottom: 4px;
    }
  }
}
</style>
