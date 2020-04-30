<template>
  <v-navigation-drawer
    v-model="drawer"
    class="orange_dark"
    dark
    absolute
    bottom
    temporary
  >
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block>Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: ['open'],
  data() {
    return {
      items: [
        { title: 'Agencias', icon: 'dashboard' },
        { title: 'Pullman Pass', icon: 'dashboard' },
        { title: 'Viajes Especiales', icon: 'dashboard' },
        { title: 'Cuenta Corriente', icon: 'dashboard' },
        { title: 'Venta Cuponera', icon: 'dashboard' },
        { title: 'Destino del mes', icon: 'dashboard' },
        { title: 'Contacto', icon: 'dashboard' }
      ]
    }
  },
  computed: {
    drawer: {
      get() {
        return this.open
      },
      set(value) {
        this.$emit('update:open', value)
      }
    }
  }
}
</script>
