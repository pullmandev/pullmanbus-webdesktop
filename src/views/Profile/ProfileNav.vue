<template>
  <v-list dark class="orange_dark">
    <v-list-item
      v-for="item in items"
      :key="item.title"
      @click="changeRoute(item)"
    >
      <v-list-item-action>
        <v-icon dark>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title dark>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  computed: {
    items() {
      return [
        {
          title: this.$t('my_profile'),
          icon: 'person',
          name: 'my_profile'
        },
        {
          title: this.$t('my_purchases'),
          icon: 'account_box',
          name: 'purchases'
        },
        {
          title: this.$t('cancellations'),
          icon: 'clear',
          name: 'cancel_purchase'
        },
        {
          title: this.$t('change_password'),
          icon: 'lock',
          name: 'profile_pass'
        }
      ]
    }
  },
  methods: {
    changeRoute(item) {
      this.$router.push({ name: item.name })
    }
  }
}
</script>
