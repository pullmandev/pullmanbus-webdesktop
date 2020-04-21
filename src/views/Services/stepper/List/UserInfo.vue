<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
      <v-card class="pt-3 pr-3 pl-3" color="orange">
        <v-card-title class="px-2">
          <v-row no-gutters justify="center">
            <v-col class="pt-2">
              <span
                class="headline user-data-title white--text"
                v-lang.purchase_data
              ></span>
            </v-col>
            <v-col>
              <v-btn
                color="light"
                class="orange--text"
                @click="
                  $router.push({ path: '/login', query: { fromService: true } })
                "
              >
                <span class="headline capitalize" v-lang.login></span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="validForm">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    dark
                    filled
                    outlined
                    :hint="translate('insert_name')"
                    :label="translate('name')"
                    outline-1
                    clearable
                    :rules="generalRules"
                    required
                    class="app-textfield"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="lastname"
                    dark
                    filled
                    outlined
                    :hint="translate('insert_lastname')"
                    :label="translate('lastname')"
                    outline
                    clearable
                    class="app-textfield"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="rut"
                    dark
                    filled
                    outlined
                    :rules="rutRules"
                    :label="'Nº ' + translate('document')"
                    :hint="translate('insert_rut')"
                    outline
                    clearable
                    required
                    class="app-textfield"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="movil"
                    dark
                    filled
                    outlined
                    prefix="+569"
                    :label="translate('mobile')"
                    clearable
                    placeholder=" "
                    :hint="translate('insert_mobile')"
                    mask="#### ####"
                    class="app-textfield"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    dark
                    filled
                    outlined
                    :rules="emailRules"
                    label="E-mail"
                    required
                    class="app-textfield"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="confirmemail"
                    dark
                    filled
                    outlined
                    :rules="emailconfirmRules"
                    :label="translate('confirm_email')"
                    required
                    class="app-textfield"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            class="white--text"
            @click.native="$emit('finish')"
            v-lang.back
          ></v-btn>
          <v-btn
            color="light"
            class="orange--text"
            @click.native="confirm"
            :disabled="!validForm"
            v-lang.continue
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import validations from '@/helpers/fieldsValidation'

export default {
  props: ['dialog'],
  data() {
    return {
      validForm: false,
      name: '',
      lastname: '',
      email: '',
      confirmemail: '',
      movil: '',
      rut: '',
      nationality: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      emailconfirmRules: [
        v => !!v || 'E-mail es requerido',
        v => this.email === v || 'E-mails no coinciden'
      ],
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      generalRules: [v => !!v || 'Este campo es requerido']
    }
  },
  methods: {
    confirm() {
      const paymentInfo = {
        name: this.name,
        lastname: this.lastname,
        completeName: this.lastname
          ? this.name + ' ' + this.lastname
          : this.name,
        rut: this.rut,
        email: this.email,
        movil: this.movil
      }
      this.$emit('confirm', paymentInfo)
      this.$emit('finish')
    }
  },
  watch: {
    dialog() {
      this.name = this.$store.getters.payment_info.name
      this.lastname = this.$store.getters.payment_info.lastname
      this.email = this.$store.getters.payment_info.email
      this.confirmemail = this.$store.getters.payment_info.email
      this.movil = this.$store.getters.payment_info.movil
      this.rut = this.$store.getters.payment_info.rut
    }
  }
}
</script>
<style>
.user-data-title {
  color: var(--var-dark-blue);
}
</style>
