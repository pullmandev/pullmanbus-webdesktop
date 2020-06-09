<template v-if="direction">
  <div>
    <v-autocomplete
      class="body-1"
      :append-icon="userCity === '' || userCity == null ? '$dropdown' : ''"
      dark
      :label="languageChange"
      :items="cities"
      color="grey lighten-4"
      item-text="nombre"
      item-value="codigo"
      :menu-props="{
        bottom: true,
        overflowY: true,
        maxHeight: this.windowHeight > 650 ? 300 : 200
      }"
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
  props: ['direction', 'value', 'windowHeight'],
  name: 'CitiesList',
  data() {
    return {
      windowSize: {
        x: window.innerWidth,
        y: window.innerHeight
      }
    }
  },
  computed: {
    ...mapGetters({
      cities: ['getCitiesList']
    }),
    userCity: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
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
