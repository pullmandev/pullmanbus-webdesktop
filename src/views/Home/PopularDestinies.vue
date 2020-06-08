<template>
  <div>
    <BannerImageList
      @dialog="openNew"
      title="Temas de interés"
      subTitle="Infórmate sobre nuestros servicios, convenios y otros"
      :itemTitle="[
        'Pullman Bus en Teletrece',
        'Instalaión túnel sanatizador',
        //'Tecnologías de Pullman Bus para pasajes y terminales',
        'PullmanBus inicia ciclo de charlas antidiscriminación para sus tripulaciones',
        'Hermanos Bolivianos'
      ]"
      :itemContent="[
        'Pullman bus comprometidos con sus clientes - Buses de todos sus servicios garantizando un viaje seguro',
        'Túnel sanitizador. Ministra Florida Hutt, informó iniciativa a cargo de empresa Pullman',
        //'Debido a la contingencia nacional del Covid-19, Pullman Bus te invita a conversar con Tío Pullman.',
        'Este miércoles 10 de junio, PullmanBus iniciará el ciclo de charlas antidiscriminación',
        'Hermanos Bolivianos, Pullman Bus dispone de buses para ciudadanos bolivianos'
      ]"
      :links="[
        'https://www.24horas.cl/coronavirus/pullman-inaugura-tunel-sanitizador-en-terminal-de-buses-de-estacion-central-4103664',
        'https://www.facebook.com/teletrece/videos/241244087072392',
        //'https://diariotv.cl/dudas-sobre-venta-de-pasajes-y-terminales-debuta-robot-que-responde-por-whatsapp/',
        'Dialog',
        'https://www.cooperativa.cl/noticias/sociedad/salud/coronavirus/bolivianos-varados-ya-comenzaron-a-viajar-hacia-iquique-para-retornar-a/2020-04-29/002450.html'
      ]"
      :images="[
        'Noticia1-1.png',
        'Noticia3-1.png',
        //'Tecnologia-Tio-Pullman.jpg',
        'Charlas_cutted.png',
        'Noticia2-1.png'
      ]"
    />
    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay="false"
      scrollable
    >
      <v-card>
        <v-toolbar dark class="orange">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Noticias</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <news />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import BannerImageList from '@/components/BannerImageList'
import News from '@/views/Home/Noticia'
export default {
  components: {
    BannerImageList,
    News
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    openNew() {
      this.dialog = true
    }
  }
}
</script>
