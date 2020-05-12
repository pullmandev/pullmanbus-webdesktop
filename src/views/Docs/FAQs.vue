<template>
  <section class="container">
    <v-row justify="center">
      <v-col>
        <h2 class="mb-12 text-center">{{ $t('FAQs') }}</h2>
        <v-expansion-panels multiple>
          <v-expansion-panel v-for="(info, i) in availableInfo" :key="i">
            <v-expansion-panel-header color="blue_dark" class="white--text">
              <h3>{{ info.titulo }}</h3>
              <template v-slot:actions>
                <v-icon color="white">mdi-plus</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-6">
              <ol>
                <li v-for="(renglon, i) in info.detalle" :key="i">
                  <h3>{{ renglon.titulo }}</h3>
                  <p v-for="(item, i) in renglon.contenido" :key="i">
                    {{ item }}
                  </p>
                </li>
              </ol>
            </v-expansion-panel-content>
          </v-expansion-panel>
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
    return { data: [] }
  },
  computed: {
    availableInfo() {
      return this.data.filter(item => item.estado === 'ACTI')
    }
  },
  mounted() {
    this.$parent.$data.title = 'FAQs'
    API.getFaqs()
      .then(response => {
        this.data = response.data
        console.log('faqs', this.data)
      })
      .catch(err => console.error(err))
  }
}
</script>
