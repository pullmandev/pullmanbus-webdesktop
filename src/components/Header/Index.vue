<template>
  <div>
    <v-app-bar color="orange" fixed dark style="overflow: hidden;">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn text @click="$router.push({ path: '/' })" style="height: 100%">
        <v-img
          src="../../../static/logos/pullmanbus_blanco.png"
          height="70"
          width="240"
        />
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon>mdi-chevron-right</v-icon>
        <a
          href="http://ventasctacte.pullman.cl/odp"
          class="white--text"
          style="text-decoration: none"
          target="_blank"
        >
          CUENTA CORRIENTE
        </a>
      </v-btn>
      <v-btn text :to="{ name: 'ConfirmationServicesPanel' }">
        <v-icon>mdi-chevron-right</v-icon>
        CONFIRMACION DE REGRESO
      </v-btn>
      <v-menu
        bottom
        offset-y
        style="display: flex; height: 100%; align-items: center;"
      >
        <template v-slot:activator="{ on }">
          <v-btn class="white--text" text v-on="on">
            Menu
            <v-icon>mdi-chevron-down</v-icon>
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
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-img
              class="mx-2"
              src="../../../static/logos/header/Iconos-25.png"
              height="30"
              width="30"
            />
            {{ $t($i18n.locale) }}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in languageMenu"
            :key="index"
            @click="$i18n.locale = item.lang"
          >
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-if="Object.keys(user.usuario).length <= 0">
        <v-btn text @click="openDialog('login')">
          <v-img
            class="mx-2"
            src="../../../static/logos/header/Iconos-24.png"
            height="30"
            width="30"
          />
          Inicio sesión
        </v-btn>
      </template>
      <template v-else>
        <v-menu
          bottom
          offset-y
          style="display: flex; height: 100%; align-items: center;"
        >
          <template v-slot:activator="{ on }">
            <v-btn class="white--text" text v-on="on">
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
              v-for="(route, i) in profileManu"
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
    </v-app-bar>
    <Drawer :open.sync="drawer" :links="links" />
  </div>
</template>
<script>
import Drawer from '@/components/Header/Drawer'
import openDialog from '@/helpers/openDialog'
import { mapGetters } from 'vuex'
export default {
  props: ['links'],
  components: {
    Drawer
  },
  data: () => ({
    drawer: false,
    loginDialog: false,
    profileManu: [
      { title: 'my_profile', name: 'my_profile' },
      { title: 'my_purchases', name: 'purchases' },
      { title: 'cancellations', name: 'cancel_purchase' },
      { title: 'change_password', name: 'profile_pass' }
    ]
  }),
  computed: {
    ...mapGetters({
      user: ['userData']
    }),
    languageMenu() {
      return [
        { title: this.$t('es'), lang: 'es' },
        { title: this.$t('en'), lang: 'en' }
      ]
    }
  },

  methods: {
    openDialog,
    signOut() {
      this.$store.dispatch('DELETE_USER')
      this.$router.push({ path: '/' })
    }
  }
}
</script>
