<template>
  <v-menu
    transition="slide-y-transition"
    bottom
  >
    <v-btn icon slot="activator">
      <v-icon>menu</v-icon>
    </v-btn>
    <v-list>
      <v-list-tile v-for="item in items" :key="item.title" @click="changeRoute(item)">
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>
<script>
export default {
  computed: {
    items () {
      return [
        { title: this.translate('my_profile'), icon: 'person', name: 'my_profile' },
        { title: this.translate('my_purchases'), icon: 'account_box', name: 'purchases' },
        { title: this.translate('cancellations'), icon: 'clear', name: 'cancel_purchase' },
        { title: this.translate('change_password'), icon: 'lock', name: 'profile_pass' }
      ]
    }
  },
  methods: {
    changeRoute (item) {
      this.$router.push({name: item.name})
    }
  }
}
</script>