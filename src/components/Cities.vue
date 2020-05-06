<template v-if="direction">
  <div>
    <v-autocomplete
      class="body-1"
      dark
      :outlined="outlined"
      :label="languageChange"
      :items="cities"
      color="grey lighten-4"
      item-text="nombre"
      item-value="codigo"
      :menu-props="{ bottom: true }"
      return-object
      clearable
      v-model="userCity"
    >
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.nombre"></v-list-item-title>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: ['direction', 'outlined', 'fromHome'],
  name: 'CitiesList',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      cities: ['getCitiesList']
    }),
    userCity: {
      get() {
        if (this.direction === 'from') {
          return this.$store.state.searching.from_city
        } else {
          return this.$store.state.searching.to_city
        }
      },
      set(value) {
        this.$store.dispatch('SET_NEW_USER_SEARCHING_CITY', {
          city: value,
          direction: this.direction
        })
      }
    },
    languageChange() {
      return this.direction === 'from'
        ? this.$t('from_city2')
        : this.$t('to_city2')
    }
  }
}
</script>
