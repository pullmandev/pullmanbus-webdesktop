<template>
  <div>
    <v-card flat hover class="mt-2">
      <v-card-title>
        <h3 class="title blue--text" style="font-size: 1rem !important;">
          {{ $t('price_range') }}
        </h3>
      </v-card-title>
      <v-card-text>
        <div class="label-price-slider">
          <div class="capitalize">
            <span class="d-block">{{ $t('from') }}</span>
            {{ min | currency }}
          </div>
          <div class="capitalize">
            <span class="d-block">{{ $t('hasta') }}</span>
            {{ max | currency }}
          </div>
        </div>
        <vue-slider
          ref="slider"
          v-model="value"
          v-bind="options"
          :process="true"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'

const minVal = 500
const maxVal = 60000
export default {
  components: {
    vueSlider
  },
  data() {
    return {
      min: minVal,
      max: maxVal,
      value: [minVal, maxVal],
      options: {
        tooltipDir: ['bottom', 'top'],
        tooltipFormatter: val => '$' + val,
        tooltip: 'hover',
        width: '100%',
        height: 8,
        dotSize: 20,
        min: 500,
        max: 60000,
        interval: 1,
        disabled: false,
        show: true,
        speed: 0.3,
        reverse: false
      }
    }
  },
  watch: {
    value(newValue) {
      this.$store.dispatch('SET_USER_FILTER', {
        filter: {
          min: newValue[0],
          max: newValue[1]
        },
        type: 'prices'
      })
    }
  }
}
</script>
<style>
.filter-title {
  color: var(--var-dark-blue);
}
.process-color {
  background-color: var(--var-light-blue);
}
.label-price-slider {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--var-dark-blue);
}
</style>
