<template>
  <div>
    <v-card flat hover class="mt-2">
      <v-container fluid>
        <h3 class="title blue--text" style="font-size: 1rem !important;">
          {{ $t('service') }}
        </h3>
        <v-radio-group v-model="service" :mandatory="false" @change="setFilter">
          <v-radio
            color="blue_dark"
            v-for="(item, index) in classFilters"
            :key="index"
            :label="item"
            :value="item"
            style="font-size: 1rem !important;"
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
      service: 'Todos'
    }
  },
  methods: {
    setFilter() {
      this.$store.dispatch('SET_USER_FILTER', {
        filter: this.service,
        type: 'selectedClass'
      })
    }
  },
  computed: mapGetters({
    classFilters: ['getUserClassFilter']
  })
}
</script>
<style>
.v-label {
  font-size: 0.8rem;
  text-transform: uppercase;
}
</style>
