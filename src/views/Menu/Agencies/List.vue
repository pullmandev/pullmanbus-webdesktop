<template>
  <section class="container">
    <div v-if="loading" class="text-center pt-12">
      <v-progress-circular
        indeterminate
        :size="100"
        color="blue"
      ></v-progress-circular>
    </div>
    <v-row v-else justify="center">
      <v-col>
        <v-expansion-panels multiple>
          <v-row>
            <v-col cols="6">
              <v-expansion-panel
                v-for="(info, i) in regionsByColumn.one"
                :key="i"
              >
                <v-expansion-panel-header color="blue_dark" class="white--text">
                  <h3>{{ info.region.descripcion }}</h3>
                  <template v-slot:actions>
                    <v-icon color="white">mdi-plus</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="pa-6">
                  <ul>
                    <li v-for="(item, index) in info.cities" :key="index">
                      <router-link :to="{ name: 'AgencyCity', query: item }">{{
                        item.nombre
                      }}</router-link>
                    </li>
                  </ul>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-col>
            <v-col cols="6">
              <v-expansion-panel
                v-for="(info, i) in regionsByColumn.two"
                :key="i"
              >
                <v-expansion-panel-header color="blue_dark" class="white--text">
                  <h3>{{ info.region.descripcion }}</h3>
                  <template v-slot:actions>
                    <v-icon color="white">mdi-plus</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="pa-6">
                  <ul>
                    <li v-for="(item, index) in info.cities" :key="index">
                      <router-link :to="{ name: 'AgencyCity', query: item }">{{
                        item.nombre
                      }}</router-link>
                    </li>
                  </ul>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-col>
          </v-row>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <div style="height: 50vh;"></div>
  </section>
</template>
<script>
import API from '@/services/api/parameters'
export default {
  data() {
    return { loading: false, regions: [] }
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
  mounted() {
    this.$parent.$data.title = 'Agencias Pullman Bus'
    this.$parent.scrollToTop()
    this.getInfo()
  },
  methods: {
    async getInfo() {
      try {
        const regionsResp = await API.getRegions()
        const regions = regionsResp.data
        console.log(regions)
        regions.forEach(region => {
          API.getCities({ codigo: region.ordenGeografico })
            .then(resp => {
              const cities = resp.data
              const dataItem = {
                region,
                cities
              }
              const unorderedList = this.regions
              unorderedList.push(dataItem)
              this.regions = unorderedList.sort(
                (a, b) => a.region.codigo - b.region.codigo
              )
            })
            .catch(err => console.error(err))
        })

        this.loading = true
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
