<template v-if="direction">
  <div>
    <v-select
      class="body-1"
      dark
      :outlined="outlined"
      :label="languageChange"
      :items="cities"
      color="grey lighten-4"
      item-text="nombre"
      item-value="codigo"
      bottom
      return-object
      clearable
      v-model="userCity"
      autocomplete
    >
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.nombre"></v-list-tile-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-select>
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
        ? this.translate('from_city2')
        : this.translate('to_city2')
    }
  }
}
</script>
