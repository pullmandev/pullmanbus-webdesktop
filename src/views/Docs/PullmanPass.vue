<template>
  <section class="xim-margen">
    <h1 class="orange--text mb-3 mt-5">CLUB DE BENEFICIOS PULLMAN MÁS</h1>
    <p>
      Pullman más es el programa de fidelización de Pullman Bus creado como un complemento
      de Pullman Pass, premiamos tu lealtad y preferencia por lo que te invitamos a conocer los
      mejores beneficios que ofrece el club. ¡Tan solo con inscribirte! Viaja en esta nueva
      aventura y se miembro de nuestra gran familia.
    </p>
    <v-row>
      <v-col sm="6" xs="12" class="xim-btnpmas">
        <v-btn color="orange" class="white--text xim-90" @click="openDialog('signup')">
          <v-icon>mdi-chevron-right</v-icon>
          OBTENER PULLMAN MÁS
        </v-btn>
      </v-col>
      <v-col sm="6" xs="12" class="xim-btnpmas">
        <v-btn color="orange" class="white--text xim-90" @click="beneficios()">
          <v-icon>mdi-chevron-right</v-icon>
          DESCUBRE LOS BENEFICIOS
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-7 text-center blue--text">{{ $t('FAQs') }}</h2>
        <v-expansion-panels class="xim-expansion" multiple v-model="panel">
          <v-expansion-panel v-for="(info, i) in data" :key="i">
            <v-expansion-panel-header
              :color="changeColor(i) ? 'orange' : 'blue_dark'"
              class="white--text xim-altura"
            >
              <h3>{{ info.title }}</h3>
              <template v-slot:actions >
                <v-icon class="xim-expansion-icon" color="white">mdi-plus</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-6 content">
              <p v-if="info.has_content" v-html="info.content">

              </p>
              <a v-if="i === 0" @click="openDialog('signup')">Haz Click Aqui!</a>
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
    </v-row>
    <div class="xim-espacio-foot" style="height: 150vh;"></div>
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
          title: '¿Cómo me inscribo en el programa de Pullman más?',
          content:
            'Tan solo debes inscribir con tu correo electrónico, rellenar los campos con tus datos personales, recibirás un correo para validar la información, al validar ya serás un miembro activo del club.'
        },
        {
          has_content: true,
          title: '¿El programa tiene algún costo?',
          content:
            'No, es absolutamente gratuito, tan solo debes inscribirte e iniciar sesión para formar parte de esta gran familia.'
        },
        {
          has_content: true,
          title: '¿El Programa Pullman Pass seguirá vigente?',
          content:
            'Pullman Pass continuara funcionando para nuestros clientes inscritos, deben solicitar sus descuentos  y canjes en los puntos de ventas habilitados.'
        },
        {
          has_content: true,
          title: '¿Qué hago si olvide mi contraseña?',
          content:
            'Debes ingresar a Inicio de Sesión >> selecciona "Olvide mi contraseña“ >> debes ingresar tu correo electrónico registrado >> se te enviará una contraseña provisoria al correo electrónico con la que podrás iniciar sesión.'
        },
        {
          has_content: true,
          title: '¿Cómo obtengo los descuentos?',
          content:
            'Debes ingresar en <a target="_blank" href="http://www.pullmanmas.cl/">www.pullmanmas.cl</a> >> Selecciona el beneficio que desees >>  En la ficha del beneficio se te solicitara ingresar tu Rut de afiliado para descargar el cupón de descuento >> Selecciona “Obtén Cupón”.'
        },
        {
          has_content: true,
          title: '¿Cómo hago uso de los beneficios?',
          content:
            'Según corresponda puedes obtener cupones con descuentos por compras Web o descuentos en locales comerciales. Ingresa al sitio Web del beneficio seleccionado, y al momento de generar la compra ingresa el código del cupón para acceder a los descuentos o muestra el cupón en el local comercial del beneficio.'
        }
      ]
    }
  },
  methods: {
    openDialog,
    changeColor(index) {
      return this.panel.findIndex(item => item === index) > -1
    },
    beneficios(){
      window.open(
        'http://www.pullmanmas.cl/',
        '_blank'
      );
    }
  },
  mounted() {
    this.$parent.$data.title = 'PULLMAN MÁS'
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
@media (max-width: 550px) {
  .btnpmas{
    max-width: 100%;
  }
}
</style>
