<template>
  <div>
    <v-card flat hover class="mt-2">
      <v-container fluid>
        <h3 class="title blue--text" v-lang.company></h3>
        <v-radio-group v-model="company" :mandatory="false" @change="setFilter">
          <v-radio
            color="blue_dark"
            v-for="(item, index) in companies"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></v-radio>
        </v-radio-group>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      company: 'Todos'
    }
  },
  methods: {
    setFilter() {
      this.$store.dispatch('SET_USER_FILTER', {
        filter: this.company,
        type: 'selectedCompany'
      })
    }
  },
  computed: {
    ...mapGetters({
      companies: ['getUserCompanyFilter']
    }),
    getName() {
      let result = this.translate('company')
      for (let item of this.companies) {
        if (item.id === this.company) {
          result = item.name
          break
        }
      }
      return result
    }
  }
}
</script>
