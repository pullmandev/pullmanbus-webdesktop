<template>
  <section class="container">
    <h1 class="blue--text mb-3 mt-5">BENEFICIOS DE TARJETA PULLMAN PASS</h1>
    <p>
      Compruébalo tú mismo, porque cada vez que compres tus pasajes en Pullman
      Bus y presentes tu tarjeta de cliente frecuente estarás acumulando puntos
      para que puedas viajar completamente "GRATIS". Para acceder al selecto
      Club pullman Pass y comenzar a disfrutar de todos nuestros beneficios,
      sólo deberás llenar el formulario de inscripción en alguna de nuestras
      agencias habilitadas y eres socio...........¡ASI DE SIMPLE!
    </p>
    <ul class="firstText mb-5 pa-0">
      <li>No se cobra mantención por ser socio de Pullman Pass.</li>
      <li>Obtienes un descuento en la compra de pasajes.</li>
      <li>Acumulas puntos por cada compra de pasajes que realices.</li>
    </ul>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-7 text-center blue--text">{{ $t('FAQs') }}</h2>
        <v-expansion-panels multiple v-model="panel">
          <v-expansion-panel v-for="(info, i) in data" :key="i">
            <v-expansion-panel-header
              :color="changeColor(i) ? 'orange' : 'blue_dark'"
              class="white--text"
            >
              <h3>{{ info.title }}</h3>
              <template v-slot:actions>
                <v-icon color="white">mdi-plus</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-6 content">
              <p v-if="info.has_content">{{ info.content }}</p>
              <template v-if="info.id === 0">
                <p>
                  Los puntos tienen una vigencia de un año a partir de la fecha
                  de compra.
                </p>
                <p>
                  Se excluyen de esta condición todos los puntos acumulados
                  hasta el 28 de febrero de 2009, que estarán vigentes hasta el
                  31 de agosto de 2009.
                </p>
              </template>
              <template v-else-if="info.id === 1">
                <p>
                  Los beneficios Pullman Pass son personales e intransferibles.
                  Por lo tanto, al efectuar el canje de puntos por boletos,
                  éstos podrán ser utilizados sólo por el titular de la tarjeta.
                </p>
                <p>
                  Todos los beneficios se aplican sólo a los pasajes del titular
                  de la tarjeta de socio.
                </p>
                <p>
                  No olvides mostrar tu Pullman Pass en todas tus compras en
                  Pullman Bus.
                </p>
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="orange" class="white--text" @click="openDialog('signup')">
          <v-icon>mdi-chevron-right</v-icon>
          OBTENER PULLMAN PASS
        </v-btn>
      </v-col>
    </v-row>
    <div style="height: 50vh;"></div>
  </section>
</template>
<script>
import openDialog from '@/helpers/openDialog'

export default {
  data() {
    return {
      panel: [],
      data: [
        {
          has_content: true,
          title: '¿Cómo inscribirse en el programa Pullman Pass?',
          content:
            'Sólo debes completar el formulario de inscripción en nuestras oficinas habilitadas a lo largo del país.'
        },
        {
          has_content: true,
          title: '¿Cómo acumular puntos?',
          content:
            'Presentando tu tarjeta Pullman Pass y tu cédula de identidad, al comprar en nuestras agencias.'
        },
        {
          has_content: true,
          title: '¿Cómo canjear puntos?',
          content:
            'Sólo debes solicitar el canje en los puntos de venta habilitados, presentando tu tarjeta Pullman Pass y tu cédula de identidad.'
        },
        {
          has_content: true,
          title: '¿Cómo consultar cuántos puntos tengo acumulados?',
          content:
            'En las agencias habilitadas, con tu Rut o tarjeta Pullman Pass, o llamando al 600 660 0011.'
        },
        {
          has_content: false,
          id: 0,
          title: '¿Qué vigencia tienen los puntos?'
        },
        {
          has_content: false,
          id: 1,
          title: '¿Puede otra persona utilizar mis puntos?'
        }
      ]
    }
  },
  methods: {
    openDialog,
    changeColor(index) {
      return this.panel.findIndex(item => item === index) > -1
    }
  },
  mounted() {
    this.$parent.$data.title = 'Pullman Pass'
  }
}
</script>
<style lang="scss" scoped>
.content {
  background-color: transparent;
}

.firstText li {
  list-style: none;
  margin-top: 0.5rem;
}
</style>
