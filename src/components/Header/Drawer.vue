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
          <v-list-item-title
            ><a
              style="text-decoration: none; color: white"
              :href="item.link"
              target="blank"
              >{{ item.title }}</a
            ></v-list-item-title
          >
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
        {
          title: 'Agencias',
          icon: 'dashboard',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/agencias.jsf#header'
        },
        {
          title: 'Pullman Pass',
          icon: 'dashboard',
          link: 'https://www.pullmanbus.cl/portalWAR/paginas/contenido/pass.jsf'
        },
        {
          title: 'Viajes Especiales',
          icon: 'dashboard',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/viajesEspeciales.jsf#header'
        },
        {
          title: 'Cuenta Corriente',
          icon: 'dashboard',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/cuentaCorrientes.jsf#header'
        },
        {
          title: 'Convenio',
          icon: 'dashboard',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/convenio.jsf#header'
        },
        {
          title: 'Cambio boleto',
          icon: 'dashboard',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/canjePublico.jsf#header'
        },
        {
          title: 'Preguntas frecuentes',
          icon: 'dashboard',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/preguntasfrecuentes.jsf'
        },
        {
          title: 'Contacto',
          icon: 'dashboard',
          link:
            'https://www.pullmanbus.cl/portalWAR/paginas/contenido/contacto.jsf'
        }
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
