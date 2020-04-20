<template>
  <div>
    <v-app-bar color="orange" fixed dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <div style="width: 300px">
        <v-img
          src="../../static/logos/pullman bus_blanco.png"
          height="50"
          contain
        />
      </div>
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
            <v-icon>mdi-earth</v-icon>
            {{ languageSelected }}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in languageMenu" :key="index">
            <v-list-item-title @click="languageSelected = item.title">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn text v-on="on">
        <v-icon>mdi-account-circle</v-icon>
        Iniciar sesion
      </v-btn>

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
export default {
  data: () => ({
    languageMenu: [{ title: 'Español' }, { title: 'Ingles' }],
    languageSelected: 'Español',
    startMenu: [
      { title: 'Inicio' },
      { title: 'Agencias' },
      { title: 'Pullman Pass' },
      { title: 'Contacto' }
    ]
  })
}
</script>
