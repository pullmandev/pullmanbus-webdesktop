<template>
  <div class="container-color">
    <section class="container">
      <div v-if="loading" class="text-center pt-12">
        <v-progress-circular indeterminate :size="100" color="blue"></v-progress-circular>
      </div>
      <div v-else>
        <h1 class="blue--text mr-3 mb-3 mt-5">Convenios</h1>
        <carousel
          :per-page-custom="corrouselItemsPerPage"
          :mouse-drag="true"
          loop
          autoplay
          paginationActiveColor="#1110AD"
        >
          <slide :key="i" v-for="(convenio, i) in convenios">
            <Convenio v-bind="convenio" />
          </slide>
        </carousel>
      </div>
      <div style="height: 50vh;"></div>
    </section>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
import Convenio from '@/views/Docs/Convenios/Item'
import API from '@/services/api/convenios'
export default {
  components: {
    Carousel,
    Slide,
    Convenio
  },
  data() {
    return {
      loading: false,
      convenios: []
    }
  },
  mounted() {
    this.$parent.$data.title = 'Convenios'
    this.$parent.scrollToTop()
  },
  created() {
    this.getConvenios()
  },
  methods: {
    async getConvenios() {
      try {
        this.loading = true
        this.convenios = []
        const resp = await API.getConvenios()
        resp.data.forEach(convenio => {
          //console.log(convenio)
          const title = convenio.convenio.convenio
          let description = ''
          convenio.portalConvInformacionI18ns.forEach(item => {
            if (item.i18n === 'es') {
              description = item.descripcion
            }
          })
          const img = convenio.imagenCarrusel
          this.convenios.push({
            title,
            description,
            img
          })
        })
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    corrouselItemsPerPage() {
      const length = this.convenios.length
      let name = this.$vuetify.breakpoint.name
      let num
      if (name == 'xs') {
        num = 1
      } else if (name == 'sm') {
        num = 2
      } else if (name == 'md') {
        num = 3
      } else if (name == 'lg') {
        num = 3
      } else {
        num = 4
      }
      const md = length < num ? length : num
      return [
        [1400, md],
        [1000, md],
        [700, md],
        [600, md],
        [0, 1]
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.container-color {
  background: var(--var-light);
}
</style>
