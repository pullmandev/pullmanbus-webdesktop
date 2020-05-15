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
      >
        <v-list-item-icon style="margin: 10px 0">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <a
              style="text-decoration: none; color: white; font-size: .9rem"
              :href="item.link"
              v-if="item.link"
              target="_blank"
              >{{ item.title }}</a
            >
            <router-link
              v-else
              :to="{ name: item.route }"
              style="text-decoration: none; color: white; font-size: .9rem"
            >
              {{ item.title }}
            </router-link>
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
