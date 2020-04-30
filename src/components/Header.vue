<template>
  <div>
    <v-app-bar color="orange" fixed dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn
        text
        color="orange"
        class="pb-12"
        @click="$router.push({ path: '/' })"
      >
        <div style="width: 300px" class="mb-12">
          <v-img
            src="../../static/logos/pullman bus_blanco.png"
            height="50"
            contain
          />
        </div>
      </v-btn>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            Inicio
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in startMenu" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-img
              class="mx-2"
              src="../../static/logos/header/Iconos-25.png"
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
            src="../../static/logos/header/Iconos-24.png"
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
                src="../../static/logos/header/Iconos-24.png"
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
            <v-list-item @click="$router.push({ name: 'my_profile' })">
              <v-list-item-title v-lang.my_profile></v-list-item-title>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-list-item-title v-lang.sign_out></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
import openDialog from '@/helpers/openDialog'
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    loginDialog: false,
    languageMenu: [{ title: 'Español' }, { title: 'Ingles' }],
    languageSelected: 'Español',
    startMenu: [
      { title: 'Agencias' },
      { title: 'Pullman Pass' },
      { title: 'Viajes Especiales' },
      { title: 'Cuenta Corriente' },
      { title: 'Venta Cuponera' },
      { title: 'Destino del mes' },
      { title: 'Contacto' }
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
