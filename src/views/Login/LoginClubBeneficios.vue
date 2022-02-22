<template>
  <Container :open="open" :width="350" @close="$emit('close')">
    <v-container class="pt-0 xim-desktop">
      <v-form v-model="validForm" class="xim-mlr">
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="blue_dark--text headline">{{ $t('club_login') }}</h1>
          </v-col>
          <v-col cols="12" class="text-center">
            <p>{{ $t('club_login_text.description') }}</p>
          </v-col>
          <v-col cols="12">
                <v-text-field
                  light
                  dense
                  label="RUT"
                  color="blue_dark"
                  v-model="rut"
                  required
                  maxLength="10"
                  @keyup="validaRut"
                  :rules="rutRules"
                ></v-text-field>
          </v-col>
          <!--
          <v-col cols="12">
            <v-text-field
              dense
              v-model="password"
              :label="$t('password')"
              :append-icon="see ? 'visibility' : 'visibility_off'"
              @click:append="see = !see"
              :type="see ? 'password' : 'text'"
              outline-1
              color="blue"
              :rules="passwordRules"
            ></v-text-field>
          </v-col>
          -->
          <v-col cols="8" offset="2" class="pt-3">
            <v-btn
              small
              :disabled="!validForm || loading"
              block
              class="white--text xim-search-font rounded-search"
              color="blue_dark"
              @click="login"
            >
              <template v-if="loading">
                <v-progress-circular
                  indeterminate
                  color="blue_dark"
                ></v-progress-circular>
              </template>
              <template v-else>
                <span>{{ $t('club_btn') }}</span>
              </template>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </Container>
</template>

<script>
// Base components
import Container from '@/views/Login/Container'
import API from '@/services/api/coupon'
import validations from '@/helpers/fieldsValidation'

export default {
  components: {
    Container
  },
  props: ['open'],
  data() {
    return {
      loading: false,
      validForm: false,
      see: true,
      rut: '',
      password: '',
      rutRules: [(v) => !!v || 'Rut es requerido', validations.rutValidation],
      passwordRules: [v => !!v || 'Ingrese contraseña', validations.passwordValidation]
    }
  },
  methods: {
    validaRut() { 
      this.rut = this.rut.replace(/[\s]|[a-yA-Y][^kK]/g,'');
    },
    login() {
      this.loading = true
      API.validaUsuario({ idSistema: "7", rut: this.rut })
        .then(response => {
          const data = JSON.parse(JSON.stringify(response.data))
          if (!data.valido){
            this.$notify({
              group: 'error',
              title: this.$t('club_login'),
              type: 'error',
              text: this.$t('club_login_error')
            })
            return
          }else{
            this.$router.push({ path: `/couponServices/` })
             this.$store.dispatch('SET_USER_CLUB_BENEFICIOS', {
              userClubBeneficios: {
                programa: data.programa,
                nombre: data.nombre,
                apellidoPaterno: data.apellidoPaterno,
                apellidoMaterno: data.apellidoMaterno,
                mailVenta: data.mailVenta,
                valido: data.valido
              }
            })
            this.$store.dispatch('SET_SESSION_DIALOG', {
              type: 'open',
              open: false
            })
          }     
          //console.log(response.data)
/*           if (!data.exito) {
            this.$notify({
              group: 'error',
              title: this.$t('login'),
              type: 'error',
              text: this.$t('login_error')
            })
            return
          }
          let completeName = data.usuario.apellidoPaterno
            ? data.usuario.apellidoPaterno + ' '
            : ''
          completeName = data.usuario.apellidoMaterno
            ? completeName + data.usuario.apellidoMaterno
            : completeName
          completeName = data.usuario.nombre + ' ' + completeName.trim()
          const paymentInfo = {
            name: data.usuario.nombre,
            rut: data.usuario.rut,
            email: data.usuario.email.toLowerCase(),
            movil: null,
            completeName
          }
          data.usuario.email = data.usuario.email.toLowerCase()
          data.usuario.fechaCreacion = moment(data.usuario.fechaCreacion).format(
            'DD-MM-YYYY'
          )
          data.usuario.fechaNacimiento = moment(data.usuario.fechaNacimiento).format(
            'DD-MM-YYYY'
          )
          this.$store.dispatch('SET_USER', {
            userData: {
              token: data.token,
              usuario: data.usuario,
              payment_info: paymentInfo,
              cambiaClave: data.cambiaClave,
              urlInicial: data.urlInicial,
              active: true
            }
          })
          if (data.usuario.rut == null) {
            this.$router.push({ name: 'my_profile' })
          }
          this.$store.dispatch('SET_SESSION_DIALOG', {
            type: 'open',
            open: false
          }) */
        })
        .catch(err => console.log(err))
        .finally(() => {
          this.loading = false
        })
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
.small-text {
  font-size: 16px;
  text-decoration: underline;
  opacity: 0.7;
  text-align: center;
  color: var(--var-blue_dark);
}
.spacer {
  height: 20vh;
}
</style>
