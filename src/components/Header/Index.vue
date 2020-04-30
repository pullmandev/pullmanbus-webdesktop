<template>
  <div>
    <v-app-bar color="orange" fixed dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn
        text
        color="orange"
        class="pb-12"
        @click="$router.push({ path: '/' })"
      >
        <div style="width: 300px" class="mb-12">
          <v-img
            src="../../../static/logos/pullman bus_blanco.png"
            height="50"
            contain
          />
        </div>
      </v-btn>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-img
              class="mx-2"
              src="../../../static/logos/header/Iconos-25.png"
              height="30"
              width="30"
            />
            {{ languageSelected }}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in languageMenu" :key="index">
            <v-list-item-title @click="languageSelected = item.title">
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
          Iniciar sesion
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
              <span
                class="hidden-sm-and-down header-text capitalize"
                v-lang.my_account
              ></span>
              <v-icon>arrow_drop_down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(route, i) in profileManu"
              :key="i"
              @click="$router.push({ name: route.name })"
            >
              <v-list-item-title>{{
                translate(route.title)
              }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-list-item-title v-lang.sign_out></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <Drawer :open.sync="drawer" />
  </div>
</template>
<script>
import Drawer from '@/components/Header/Drawer'
import openDialog from '@/helpers/openDialog'
import { mapGetters } from 'vuex'
export default {
  components: {
    Drawer
  },
  data: () => ({
    drawer: false,
    loginDialog: false,
    languageMenu: [{ title: 'Español' }, { title: 'Ingles' }],
    languageSelected: 'Español',
    profileManu: [
      { title: 'my_profile', name: 'my_profile' },
      { title: 'my_purchases', name: 'purchases' },
      { title: 'cancellations', name: 'cancel_purchase' },
      { title: 'change_password', name: 'profile_pass' }
    ]
  }),
  computed: mapGetters({
    user: ['userData']
  }),
  methods: {
    openDialog,
    signOut() {
      this.$store.dispatch('DELETE_USER')
      this.$router.push({ path: '/' })
    }
  }
}
</script>
