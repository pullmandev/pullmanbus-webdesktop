<template>
  <v-dialog
    v-model="open"
    overlay-color="blue_dark"
    :max-width="width"
    persistent
  >
    <v-card color="orange" dark class="rounded-search-box">
      <div class="d-flex justify-end">
        <v-btn
          text
          small
          fab
          class="white--text mt-2 mr-4"
          @click="
            $store.dispatch('SET_SESSION_DIALOG', {
              type: 'open',
              open: false
            })
          "
          ><v-icon>clear</v-icon>
        </v-btn>
      </div>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['width', 'open']
}
</script>
