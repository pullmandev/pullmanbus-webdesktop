<template>
  <div>
    <v-card flat hover class="mt-2 transparentCard">
      <v-card-title>
        <div class="label-price-slider">
          <img
            src="../../../../static/logos/seats/pet-filter-panel.png"
            class="pet-image"
          />
        </div>
      </v-card-title>
      <v-card-text>
        <div class="label-price-slider">
          <v-switch
            class="switch-pet"
            v-model="petService"
            @change="setFilter"
          ></v-switch>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      petService: false
    }
  },
  mounted() {
    console.log(this.searching)
    this.petService = this.searching.petService
  },
  computed: {
    ...mapGetters({
      searching: ['getSearching']
    })
  },
  watch: {},
  methods: {
    setFilter() {
      this.$store.dispatch('SET_USER_FILTER', {
        filter: this.petService,
        type: 'pet'
      })
    }
  }
}
</script>
<style>
.switch-pet {
  justify-content: center;
}
.pet-image {
  height: auto;
  justify-content: center;
}
.label-price-slider {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--var-dark-blue);
  justify-content: center !important;
}
</style>
