<template>
  <Container :open="open" :width="300" @close="$emit('close')">
    <v-container class="text-center py-0">
      <v-row class="mt-5">
        <v-col cols="12" md="12" lg="12">
          <h1>Gracias!</h1>
        </v-col>
        <v-col cols="12" md="12" lg="12">
          <p>Revisa tu correo electrónico para seguir las instrucciones.</p>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <div
            class="confirmation-icon text-center mb-10 d-flex align-center justify-center"
          >
            <v-icon size="70" class="blue_dark--text">check</v-icon>
          </div>
        </v-col>
        <v-col cols="12" class="text-right">
          <a
            class="blue_dark--text"
            @click="
              $store.dispatch('SET_SESSION_DIALOG', {
                type: 'dialogType',
                dialogType: 'changePassword'
              })
            "
          >
            Cambio de contraseña
          </a>
        </v-col>
      </v-row>
    </v-container>
  </Container>
</template>
<script>
// Base components
import Container from '@/views/Login/Container'

export default {
  props: ['open'],
  components: {
    Container
  }
}
</script>
<style scoped>
.confirmation-icon {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: white;
}
</style>
