<template>
  <v-dialog v-model="open" overlay-color="blue_dark"  
            :max-width="width" persistent>
    <v-card class="rounded-search-box">
      <div class="d-flex justify-end">
        <v-btn
          max-width="25px"
          max-height="25px"
          fab
          class="white--text mt-2 mr-4 elevation-1"
          color="orange"
          @click="
            $store.dispatch('SET_SESSION_DIALOG', {
              type: 'open',
              open: false
            })
          "
          ><v-icon color="white">clear</v-icon>
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
