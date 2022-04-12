<template>
  <v-container>
    <v-toolbar color="blue_light" class="toolbar-radius white--text mb-3" dense>
      <img
        src="../../../static/logos/menu/icono_agencias.svg"
        alt="icono_viajes_especiales"
        height="65"
      />
      <v-toolbar-title>
        <h2 class="text-left title" style="line-height: 20px">
          {{ $t('agencies.form') }}
        </h2>
      </v-toolbar-title>
    </v-toolbar>
    <v-card color="background_blue">
      <v-card-text>
        <div class="my-6 blue_light--text text-center" style="font-size: 0.875rem;">
          <h2 style="font-size: 1.2rem; text-transform: uppercase;">
            <v-icon color="blue_light" size="35">
              mdi-arrow-down-thin-circle-outline
            </v-icon>
            {{ $t('agencies.enter') }}
          </h2>
        </div>
        <section class="container">
          <div v-if="loading" class="text-center pt-12">
            <v-progress-circular
              indeterminate
              :size="100"
              color="blue"
            ></v-progress-circular>
          </div>
          <div v-if="!loading">
            <div class="d-flex justify-center flex-wrap">
              <region-icons @click-region="getRegion" ref="regionList" />
            </div>
          </div>
        </section>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import API from '@/services/api/parameters'
import RegionIcons from './RegionIcons'

export default {
  components: {
    RegionIcons
  },
  data() {
    return {
      loading: false,
      regions: [],
      regionsWithCities: 0,
      regionsLength: 0
    }
  },
  computed: {
    regionsByColumn() {
      const half = Math.ceil(this.regions.length / 2)
      const result = {
        one: this.regions.slice(0, half),
        two: this.regions.slice(half, this.regions.length)
      }
      return result
    }
  },
  watch: {
    regionsWithCities(value) {
      if (value !== 0 && this.regionsWithCities === this.regionsLength) {
        this.loading = false
        this.$nextTick(() => {
          this.$refs.regionList.clickedRegion(0)
        })
      }
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      try {

        this.loading = true

        const regionsResp = await API.getRegions()
        const regions = regionsResp.data
        this.regionsLength = regions.length
        regions.forEach(region => {
          this.getCities(region)
        })
      } catch (err) {
        console.error(err)
      }
    },
    getCities(region) {
      const codigo = region.codigo
      API.getCities({ codigo })
        .then(resp => {
          const cities = resp.data
          const dataItem = {
            region,
            cities
          }
          const unorderedList = this.regions
          unorderedList.push(dataItem)
          this.regions = unorderedList.sort((a, b) => a.region.codigo - b.region.codigo)
          this.regionsWithCities += 1
        })
        .catch(err => console.error(err))
    },
    getRegion({ code, name }) {
      const region = this.regions.find(item => item.region.codigo == code)
      if (region) {
        const result = { ...region, name, code }
        this.$parent.region = result
      } else {
        this.$parent.region = { cities: [], name, code }
      }
    }
  }
}
</script>
