<template>
  <v-navigation-drawer
    v-model="drawer"
    width="280"
    class="orange_dark pt-12"
    dark
    fixed
    clipped
    temporary
  >
    <v-list>
      <v-list-item
        v-for="(item, i) in links"
        :key="item.title"
        link
        style="margin: 0 0"
        :href="item.link"
        :to="item.route ? { name: item.route } : undefined"
        :target="item.link ? '_blank' : undefined"
      >
        <v-list-item-icon class="align-center" style="margin: 0 0; height: 3rem">
          <img
            :height="item.type2 ? 25 : 45"
            :src="require(`../../../static/logos/menu/${item.icon}`)"
            :alt="`menu-icon-${i}`"
            :style="{
              marginLeft: item.type2 ? '3px' : '0px',
              marginRight: item.type2 ? '4px' : '0px'
            }"
          />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="text-transform: uppercase;">
            {{ $t(item.title) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: ['open', 'links'],
  computed: {
    drawer: {
      get() {
        return this.open
      },
      set(value) {
        this.$emit('update:open', value)
      }
    }
  }
}
</script>
