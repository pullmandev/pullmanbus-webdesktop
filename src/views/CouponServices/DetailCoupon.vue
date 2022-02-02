<template>
  <Container :open="open" :width="300" @close="$emit('close')">
    <v-container class="pt-0 xim-desktop">
        <div id="idSearchConfirm">
            <v-row v-if="requiereAutenticacion">
            <v-col cols="12" sm="12" md="8" offset-md="2">
                <v-card class="mt-12">
                <v-toolbar
                    dense
                    class="elevation-0"
                    dark
                    color="blue_light"
                    id="ServiceToolbar"
                >
                    <v-toolbar-title>
                    <span class="title ml-3">Detalle Cuponera</span>
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-container>
                    <table id="tblCupon">
                        <tr>
                          <th>Empresa</th>
                          <th>Programa</th>
                          <th>Boletos Ida</th>
                          <th>Boletos Vuelta</th>
                          <th>Valor</th>
                        </tr>
                        <tr>
                          <td>{{ cupon.origen + " - " + cupon.destino }}</td>
                          <td>{{ cupon.programa }}</td>
                          <td>{{ cupon.cantidadIda }} </td>
                          <td>{{ cupon.cantidadVuelta }}</td>
                          <td>{{ cupon.total | currency }}</td>
                        </tr>
                    </table>
                    </v-container>
                </v-card-text>
                </v-card>
            </v-col>
            </v-row>
        </div>
    </v-container>
  </Container>
</template>

<script>
// Base components
import Container from '@/views/Login/Container'

export default {
  components: {
    Container
  },
  props: ['open'],
  data() {
    return {
    }
  },
  
}
</script>

<style scoped>
.banner {
  width: 100%;
}
.imageBanner {
  width: 100%;
  height: 100%;
}
.small-text {
  font-size: 16px;
  text-decoration: underline;
  opacity: 0.7;
  text-align: center;
  color: var(--var-blue_dark);
}
.spacer {
  height: 20vh;
}
</style>
