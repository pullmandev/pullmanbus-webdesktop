<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card class="pt-3 pr-3 pl-3">
        <v-card-title class="px-2">
          <span class="headline blue_dark--text" v-lang.purchase_data></span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="validForm">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="name"
                    color="blue"
                    filled
                    outlined
                    dense
                    :hint="translate('insert_name')"
                    :label="translate('name')"
                    outline-1
                    clearable
                    :rules="generalRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="lastname"
                    color="blue"
                    filled
                    outlined
                    dense
                    :hint="translate('insert_lastname')"
                    :label="translate('lastname')"
                    outline
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="rut"
                    color="blue"
                    filled
                    outlined
                    dense
                    :rules="rutRules"
                    :label="'Nº ' + translate('document')"
                    :hint="translate('insert_rut')"
                    outline
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="movil"
                    color="blue"
                    filled
                    outlined
                    dense
                    prefix="+569"
                    :label="translate('mobile')"
                    clearable
                    placeholder=" "
                    :hint="translate('insert_mobile')"
                    mask="#### ####"
                    class="custom-prefix"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="email"
                    color="blue"
                    filled
                    outlined
                    dense
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="confirmemail"
                    color="blue"
                    filled
                    outlined
                    dense
                    :rules="emailconfirmRules"
                    :label="translate('confirm_email')"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <v-col cols="6" class="d-flex justify-end">
              <v-btn text @click.native="$emit('finish')" v-lang.back></v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="orange"
                class="white--text"
                @click.native="confirm"
                :disabled="!validForm"
                v-lang.continue
              ></v-btn>
            </v-col>
            <v-col cols="12" class="text-center">
              <span>ó</span>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-btn
                color="blue_dark"
                class="white--text"
                @click="openDialog('login')"
              >
                <span class="capitalize" v-lang.login></span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import validations from '@/helpers/fieldsValidation'
import openDialog from '@/helpers/openDialog'

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
  mounted() {
    this.$store.watch(
      (state, getters) => getters.userData,
      userData => {
        if (Object.keys(userData.usuario).length > 0) {
          this.$emit('loged')
          this.$emit('finish')
        }
      }
    )
  },
  methods: {
    openDialog,
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
<style scoped>
.custom-prefix .v-text-field__prefix {
  margin: 0 !important;
  padding-top: 8 !important;
  padding-bottom: 8 !important;
}
</style>
