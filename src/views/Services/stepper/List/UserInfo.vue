<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <!-- <v-btn color="primary" dark slot="activator">Open Dialog</v-btn> -->
      <v-card class="pt-3 pr-3 pl-3">
        <v-card-title>
          <v-layout row wrap>
            <v-flex class="pt-2">
              <span class="headline user-data-title" v-lang.purchase_data></span>
            </v-flex>
            <v-flex>
              <v-btn outline color="primary" @click="$router.push({path: '/login', query: { fromService: true } })">
                <span class="headline capitalize" v-lang.login></span>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form v-model="validForm">
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  :hint="translate('insert_name')"
                  :label="translate('name')"
                  outline-1
                  clearable
                  :rules="generalRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="lastname"
                  :hint="translate('insert_lastname')"
                  :label="translate('lastname')"
                  outline
                  clearable
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="rut"
                  :rules="rutRules"
                  :label="'Nº ' + translate('document')"
                  :hint="translate('insert_rut')"
                  outline
                  clearable
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  prefix="+569"
                  :label="translate('mobile')"
                  clearable
                  placeholder=" "
                  :hint="translate('insert_mobile')"
                  v-model="movil"
                  mask="#### ####"/>
              </v-flex>
              <v-flex xs12>
                <v-text-field required v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field required v-model="confirmemail" :rules="emailconfirmRules" :label="translate('confirm_email')"></v-text-field>
              </v-flex>
            </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" style="background-color: var(--var-grey)" @click.native="$emit('finish')" v-lang.back></v-btn>
          <v-btn color="primary" @click.native="confirm" :disabled="!validForm" v-lang.continue></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import validations from '@/helpers/fieldsValidation'

export default {
  props: ['dialog'],
  data () {
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
        (v) => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      emailconfirmRules: [
        (v) => !!v || 'E-mail es requerido',
        (v) => this.email === v || 'E-mails no coinciden'
      ],
      rutRules: [
        (v) => !!v || 'Rut es requerido',
        validations.rutValidation
      ],
      generalRules: [
        (v) => !!v || 'Este campo es requerido'
      ]
    }
  },
  methods: {
    confirm () {
      const paymentInfo = {
        name: this.name,
        lastname: this.lastname,
        completeName: this.lastname ? this.name + ' ' + this.lastname : this.name,
        rut: this.rut,
        email: this.email,
        movil: this.movil
      }
      this.$emit('confirm', paymentInfo)
      this.$emit('finish')
    }
  },
  watch: {
    dialog () {
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
<style scoped>
  .user-data-title {
    color: var(--var-dark-blue);
  }
</style>