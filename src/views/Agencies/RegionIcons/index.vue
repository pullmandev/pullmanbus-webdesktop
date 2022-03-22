<template>
  <fragment>
    <template v-for="(region, i) of regions">
      <div
        :key="i"
        v-if="code == region.code || code == 0"
        class="svg-container"
        :class="{ selected: selectedId === i, 'single-icon': code }"
        @click="clickedRegion(i)"
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 132.9 182.4"
          style="enable-background:new 0 0 132.9 182.4;"
          xml:space="preserve"
        >
          <path v-if="region.path" class="st0" :d="region.path" />
        </svg>
        <span v-text="region.name"></span>
      </div>
    </template>
  </fragment>
</template>

<script>
import regions from '@data/regions.json'
export default {
  name: 'RegionsIcons',

  data() {
    return {
      regions,
      selectedId: 0
    }
  },

  props: {
    code: {
      type: Number,
      default: 0
    }
  },

  methods: {
    clickedRegion(i) {
      this.selectedId = i

      const region = this.regions[this.selectedId]
      console.log('clickedRegion  : ' + i)
      console.log(region)
      const { name, code } = region

      this.$emit('click-region', { name, code })
    }
  }
}
</script>

<style lang="scss" scoped src="./RegionsIcons.scss" />
