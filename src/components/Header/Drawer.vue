<template>
  <v-navigation-drawer
    v-model="drawer"
    class="orange_dark"
    dark
    fixed
    clipped
    temporary
  >
    <v-list>
      <v-list-item
        v-for="item in links"
        :key="item.title"
        link
        style="margin: 0 0"
        :href="item.link"
        :to="item.route ? { name: item.route } : undefined"
        :target="item.link ? '_blank' : undefined"
      >
        <v-list-item-icon style="margin: 10px 0">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.title }}
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
