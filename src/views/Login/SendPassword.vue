<template>
  <Container :open="open" :width="300" @close="$emit('close')">
    <v-container class="pt-0">
      <v-row class="mt-5">
        <v-form v-model="validForm">
          <v-col cols="12" class="text-center">
            <h1 class="headline">{{ $t('change_password2') }}</h1>
          </v-col>
          <v-col cols="12" class="text-center">
            <p>{{ $t('send_email') }}</p>
          </v-col>
          <v-col cols="12">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="email"
              :label="$t('email')"
              outline-1
              color="grey lighten-4"
              :rules="emailRules"
              class="app-textfield"
            ></v-text-field>
          </v-col>
          <v-col md="10" offset-md="1" cols="12" class="pt-3">
            <v-btn
              block
              class="white--text search-font rounded-search"
              color="blue_dark"
              @click="sendEmail"
              :disabled="!validForm || loading"
            >
              <template v-if="loading">
                <v-progress-circular
                  indeterminate
                  color="blue_dark"
                ></v-progress-circular>
              </template>
              <template v-else>
                <span>{{ $t('send') }}</span>
              </template>
            </v-btn>
          </v-col>
        </v-form>
      </v-row>
    </v-container>
  </Container>
</template>

<script>
// Base components
import Container from '@/views/Login/Container'
import validations from '@/helpers/fieldsValidation'
import API from '@/services/api/session'

export default {
  components: {
    Container
  },
  props: ['open'],
  data() {
    return {
      loading: false,
      validForm: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ]
    }
  },
  methods: {
    async sendEmail() {
      this.loading = true
      const response = await API.forgotPassword({ email: this.email })
      this.loading = false
      if (!response.data.exito) {
        this.$notify({
          group: 'error',
          title: this.$t('send_password'),
          type: 'error',
          text: this.$t('send_password_error')
        })
        console.error(response.data)
      } else {
        this.$notify({
          group: 'info',
          title: this.$t('send_password_success'),
          type: 'info'
        })
        this.$store.dispatch('SET_SESSION_DIALOG', {
          type: 'dialogType',
          dialogType: 'confirmation' //'change_pass'
        })
      }
    }
  }
}
</script>

<style scoped>
.banner {
  width: 100%;
}
.imageBanner {
  width: 100%;
  height: 100%;
}
.small-text-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.small-text {
  font-size: 16px;
  text-decoration: underline;
  opacity: 0.7;
  text-align: center;
  color: white;
}
.spacer {
  height: 20vh;
}
</style>
