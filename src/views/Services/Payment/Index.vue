<template>
  <v-container class="my-2">
    <InvalidConvenio :open.sync="convDialog" @accept="validate" />

    <h1 class="blue_dark--text">{{ $t('payment_methods') }}</h1>

    <v-card class="elevation-2 my-12 rounded-search-box">
      <v-toolbar dense color="orange" class="white--text elevation-0">
        <v-toolbar-title>
          <h2
            class="body-1 d-flex flex-column text-left headline"
            style="line-height: 20px"
          >
            {{ $t('services_text.conv') }}
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-card-text>
          <!--<v-radio-group v-model="selectedConvenio" row @change="getDetalleConvenio()" >
            <v-row>
              <v-col
                v-for="(item, i) in listaCovenios"
                :key="i"
                class="d-flex align-center justify-center"
                lg="2"
                md="3"
                sm="6"
                xs="12"
              >
                <v-radio class="mr-1 xim-radio-convenio" color="orange_dark" label="" :value="item.value" >
                  <template v-slot:label>
                    <v-img
                      max-height="80px"
                      max-width="80px"
                      :src="item.img"
                      class="webpay-payment"
                    />
                  </template>
                </v-radio>
              </v-col>
            </v-row>
          </v-radio-group>-->
          <v-select :items="listaCovenios" v-model="selectedConvenio">
            <template v-slot:item="{ item }" > 
              <v-img v-if="item.img"
                max-height="80px"
                max-width="80px"
                :src="item.img"
                class="webpay-payment"
              />{{ item.alt }}
            </template>
            <template v-slot:selection="{ item }">
              <v-img v-if="item.img"
                max-height="80px"
                max-width="80px"
                :src="item.img"
                class="webpay-payment"
              />{{ item.alt }}
            </template>
          </v-select>
<!--         </v-card-text>
      </v-card-title>
    </v-card>

    <v-card class="elevation-2 my-12 rounded-search-box" v-if="selectedConvenio">
      <v-toolbar dense color="orange" class="white--text elevation-0">
        <v-toolbar-title>
          <h2
            class="body-1 d-flex flex-column text-left headline"
            style="line-height: 20px"
          >
            {{ $t('services_text.validation') }}
          </h2>
        </v-toolbar-title>
      </v-toolbar>

      <v-card-title>
        {{ $t('services_text.name_conv') }}: {{ selectedConvenioName }}
      </v-card-title>

      <v-card-text> -->
        <v-form v-model="validForm" v-if="selectedConvenio">
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="12"
              :key="i"
              v-for="(item, i) in listaDetalleConvenio"
            >
              <v-text-field
                v-if="item.Tipo === 'RUT'"
                filled
                outlined
                dense
                v-model="rut"
                label="Rut"
                outline-1
                color="blue"
                :rules="rutRules"
                required
                maxLength="10"
              ></v-text-field>
              <v-text-field
                v-if="item.Tipo === 'USERNAME'"
                filled
                outlined
                dense
                v-model="username"
                label="Username"
                outline-1
                color="blue"
                required
                maxLength="10"
              ></v-text-field>
              <v-text-field
                v-if="item.Tipo === 'PASSWORD'"
                filled
                outlined
                dense
                v-model="password"
                :label="$t('password')"
                :append-icon="see ? 'visibility' : 'visibility_off'"
                @click:append="see = !see"
                :type="see ? 'password' : 'text'"
                outline-1
                color="blue"
                :rules="passwordRules"
                required
                maxLength="10"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" xs="12" sm="12">
              <v-btn
                color="orange"
                :loading="loadingRutValidation"
                class="white--text"
                @click="showDialogOrValidate"
              >
                {{ $t('services_text.validate') }}
              </v-btn>

              <v-btn text @click="selectedConvenio = ''" :disabled="loadingRutValidation">
                {{ $t('cancel') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      </v-card-title>
    </v-card>

    <v-card class="elevation-2 my-12 rounded-search-box">
      <v-toolbar dense color="orange" class="white--text elevation-0">
        <v-toolbar-title>
          <h2
            class="body-1 d-flex flex-column text-left headline"
            style="line-height: 20px"
          >
            {{ $t('services_text.methods') }}
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <div class="xim-desktop">
        <v-container class="mt-5 px-0">
          <v-row
            no-gutters
            class="resume-data px-2 py-4 mx-8 mb-3 mt-8"
            style="border: 1px solid #b8b8b8; border-radius: 5px"
          >
            <v-col xl="5" cols="4" class="d-flex justify-center align-center">
              <img
                class="icon-cart"
                src="../../../../static/logos/icono_compra.svg"
                alt="icono_compra"
              />
            </v-col>

            <v-col xl="6" cols="8" class="d-flex align-center">
              <template v-if="paymentResumeData.normal_seats.length > 0">
                <div class="width100">
                  <div style="border-bottom: 1px solid #b8b8b8" class="mb-2">
                    <span class="big-resume-text">
                      {{ $t('services_text.pay_resume') }}
                    </span>
                  </div>

                  <v-row
                    v-for="(item, i) of paymentResumeData.normal_seats"
                    :key="i"
                    class="mb-1"
                    style="min-height: 70px; border-bottom: 1px solid #b8b8b8"
                    no-gutters
                  >
                    <v-col cols="6" class="pr-2">
                      <div style="font-weight: bold;">
                        <strong class="big-resume-text">{{ item.count }} x </strong>
                        <span>{{ $t('tickets') }} {{ $t('seats') }} </span>
                        <span style="text-transform: capitalize;">
                          {{ item.servicioNombre }}
                        </span>
                        <span class="font-weight-bold">{{ item.type }} </span>
                      </div>

                      <div
                        v-if="item.discountPercentageAgreement"
                        class="muted-resume-text"
                      >
                        {{ $t('services_text.discount') }}
                        <span>({{ item.discountPercentageAgreement }}%)</span>
                        <template v-if="discountApplied">
                          "{{ selectedConvenioName }}"
                        </template>
                      </div>
                    </v-col>

                    <v-col cols="6" class="pr-2">
                      <div>
                        <span class="blue_dark--text big-resume-text">
                          {{ item.promo | currency }}
                        </span>
                        <span class="blue_dark--text" style="font-weight: bold;">
                          c/u
                        </span>
                        <span class="ml-1 semimuted-resume-text">
                          <span class="mr-1"
                            >{{ $t('services_text.normal_price') }}:
                          </span>
                          <span
                            class="orange--text"
                            style="text-decoration: line-through;"
                          >
                            {{ item.base | currency }}
                          </span>
                        </span>
                      </div>

                      <div
                        v-if="item.discountPriceAgreement"
                        class="d-flex justify-start align-center muted-resume-text"
                      >
                        <span class="mr-1">
                          {{ item.discountPriceAgreement | currency }}
                        </span>
                        <img
                          width="15px"
                          src="../../../../static/logos/icono_victo.svg"
                          alt="icono_victo"
                        />
                      </div>
                    </v-col>
                  </v-row>

                  <template v-if="paymentResumeData.promo_seats.length > 0">
                    <div
                      style="border-bottom: 1px solid #b8b8b8"
                      class="mb-2 mt-4"
                      v-if="paymentResumeData.normal_seats.length > 0"
                    >
                      <span class="resume-text">
                        Boletos con promo de vuelta (no aplica convenio)
                      </span>
                    </div>

                    <v-row
                      v-for="item of paymentResumeData.promo_seats"
                      :key="item.id"
                      class="mb-1"
                      style="min-height: 70px; border-bottom: 1px solid #b8b8b8"
                      no-gutters
                    >
                      <v-col cols="6">
                        <div style="font-weight: bold;">
                          <strong class="big-resume-text">{{ item.count }} x </strong>
                          <span>{{ $t('tickets') }} {{ $t('seats') }} </span>
                          <span class="font-weight-bold; text-transform: uppercase;">
                            {{ item.type }} y vuelta
                          </span>
                          <span style="text-transform: capitalize;">
                            {{ item.servicioNombre }}
                          </span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div>
                          <span class="blue_dark--text big-resume-text">
                            {{ item.promo | currency }}
                          </span>
                          <span class="blue_dark--text" style="font-weight: bold;">
                            c/u
                          </span>
                          <span class="ml-1 semimuted-resume-text">
                            <span class="mr-1">
                              {{ $t('services_text.normal_price') }}:
                            </span>
                            <span
                              class="orange--text"
                              style="text-decoration: line-through;"
                            >
                              {{ item.base | currency }}
                            </span>
                          </span>
                        </div>
                      </v-col>
                    </v-row>
                  </template>

                  <div class="total-data mb-2 pr-4">
                    <v-row no-gutters>
                      <v-col cols="9">
                        <span class="big-resume-text">
                          Total:
                        </span>
                      </v-col>
                      <v-col cols="3">
                        <span class="total">
                          {{ paymentResumeData.totalPromo | currency }}
                        </span>
                      </v-col>
                    </v-row>

                    <!-- <v-row v-if="paymentResumeData.totalDiscountAgreement" no-gutters>
                    <v-col cols="9">
                      <span class="semimuted-resume-text">
                        {{ $t('services_text.discount_conv') }}:
                      </span>
                    </v-col>
                    <v-col cols="3">
                      <span class="semimuted-resume-text">
                        {{ paymentResumeData.totalDiscountAgreement | currency }}
                      </span>
                    </v-col>
                  </v-row> -->

                    <v-row no-gutters>
                      <v-col cols="9">
                        <span class="semimuted-resume-text">
                          {{ $t('services_text.saving') }}:
                        </span>
                      </v-col>
                      <v-col
                        cols="3"
                        style="position: relative;"
                        class="d-flex align-center justify-end"
                      >
                        <span class="mr-2 semimuted-resume-text blue_dark--text">
                          {{ paymentResumeData.totalDiscount | currency }}
                        </span>
                        <img
                          style="position: absolute; right: -15px; bottom: 2px;"
                          width="20px"
                          src="../../../../static/logos/icono_victo.svg"
                          alt="icono_victo"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </template>
            </v-col>

            <v-col xl="1" cols="0" />
          </v-row>

          <v-form class="mt-5" v-model="validForm2">
            <v-row>
              <v-col cols="12" class="xim-horizontal-rigth">
                <div class="xim-35">
                  <v-text-field
                    filled
                    outlined
                    dense
                    v-model="email"
                    label="Email"
                    outline-1
                    color="blue"
                    class="xim-input"
                    :rules="emailRules"
                    @input="
                      v => {
                        this.emailconfirmError =
                          this.confirmemail.toUpperCase() !== v.toUpperCase()
                      }
                    "
                    required
                  ></v-text-field>
                </div>
                <div class="xim-35">
                  <v-text-field
                    filled
                    outlined
                    dense
                    v-model="confirmemail"
                    @paste.prevent
                    label="Re-ingresar email"
                    outline-1
                    color="blue"
                    class="xim-input"
                    required
                    :hint="emailconfirmError ? 'E-mails no coinciden' : ''"
                    :error="emailconfirmError"
                    @input="
                      v => {
                        this.emailconfirmError =
                          this.email.toUpperCase() !== v.toUpperCase()
                      }
                    "
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-form>

          <v-row>
            <v-col cols="12">
              <div class="xim-centrado-h">
                <v-radio-group v-model="payMethod" :mandatory="true" row>
                  <div :key="index" v-for="(item, index) in payments">
                    <div class="xim-caja">
                      <div class="xim-radio">
                        <v-radio color="orange_dark" label="" :value="item.value">
                          <template v-slot:label>
                            <v-img
                              width="100px"
                              :src="`data:image/png;base64,${item.img}`"
                              :alt="item.alt"
                              class="webpay-payment"
                            />
                          </template>
                        </v-radio>
                      </div>
                    </div>
                  </div>
                </v-radio-group>
              </div>
            </v-col>
          </v-row>

          <v-form class="mt-5" v-model="validForm3">
            <div class="d-flex justify-end mr-20">
              <v-checkbox
                color="orange_dark"
                v-model="terms"
                :rules="[v => !!v || '']"
                required
              ></v-checkbox>
              <div class="d-flex align-center">
                <label class="subheading"
                  >{{ $t('read_terms1') }}
                  <span class="termLink" @click="dialog = true">{{
                    $t('read_terms2')
                  }}</span>
                  {{ $t('read_terms3') }}</label
                >
              </div>
            </div>
            <div class="d-flex justify-end">
              <v-btn text class="grey--text" @click="toServices">{{ $t('back') }}</v-btn>
              <v-btn
                color="orange"
                class="white--text mr-5"
                :disabled="disabledButton"
                :loading="loadingPayAction"
                @click="pay"
                >{{ $t('continue') }}</v-btn
              >
            </div>
          </v-form>
        </v-container>
      </div>
      <div class="xim-movile">
        <v-container class="mt-5 px-8">
          <v-row>
            <v-col cols="12">
              <template v-if="paymentResumeData.normal_seats.length > 0">
                <div style="border-bottom: 1px solid #b8b8b8" class="mb-0">
                  <span class="big-resume-text">
                    {{ $t('services_text.pay_resume') }}
                  </span>
                </div>
              </template>
            </v-col>
            <v-col
              cols="12"
              v-for="(item, i) of paymentResumeData.normal_seats"
              :key="i"
              class="mb-1"
              style="min-height: 70px; border-bottom: 1px solid #b8b8b8"
              no-gutters
            >
              <div class="xim-columna">
                <span class="xim-strong-horizontal"
                  ><v-icon v-text="icon" color="blue">loyalty</v-icon>{{ item.count }} x
                  {{ item.servicioNombre }}</span
                >
                <span class="xim-strong-horizontal"
                  ><v-icon v-text="icon" color="blue">explore</v-icon
                  >{{ item.type }}</span
                >
                <div v-if="item.discountPercentageAgreement">
                  {{ $t('services_text.discount') }}
                  <span class="xim-strong-horizontal"
                    >({{ item.discountPercentageAgreement }} %)</span
                  >
                  <template v-if="discountApplied">
                    "{{ selectedConvenioName }}"
                  </template>
                </div>
                <span class="xim-strong-horizontal"
                  ><v-icon v-text="icon" color="orange">price_check</v-icon
                  >{{ item.promo | currency }}</span
                >
                <span class="xim-strong-horizontal"
                  >{{ $t('services_text.normal_price') }}:
                </span>
                <span class="xim-strong-horizontal"
                  ><v-icon v-text="icon" color="blue">money_off_csred</v-icon
                  >{{ item.base | currency }}</span
                >

                <div v-if="item.discountPriceAgreement">
                  <span class="xim-strong-horizontal"
                    ><v-icon v-text="icon" color="blue">money_off_csred</v-icon>
                    {{ item.discountPriceAgreement | currency }}
                    <img
                      width="15px"
                      src="../../../../static/logos/icono_victo.svg"
                      alt="icono_victo"
                    />
                  </span>
                </div>
                <template v-if="paymentResumeData.promo_seats.length > 0">
                  <div
                    class="xim-strong-horizontal"
                    v-if="paymentResumeData.normal_seats.length > 0"
                  >
                    <span class="resume-text">
                      <i>Boletos con promo de vuelta (no aplica convenio)</i>
                    </span>
                  </div>
                </template>
                <div
                  v-for="item of paymentResumeData.promo_seats"
                  :key="item.id"
                  no-gutters
                >
                  <span class="xim-strong-horizontal"
                    >{{ item.count }} x {{ $t('tickets') }} {{ $t('seats') }}</span
                  >
                  <span class="xim-strong-horizontal">{{ item.type }} y vuelta</span>
                  <span class="xim-strong-horizontal">{{ item.servicioNombre }}</span>
                  <span class="xim-strong-horizontal"
                    >{{ item.promo | currency }} c/u</span
                  >
                  <span class="xim-strong-horizontal"
                    >{{ $t('services_text.normal_price') }}:</span
                  >
                  <span class="xim-strong-horizontal">{{ item.base | currency }}</span>
                </div>

                <span class="xim-strong-horizontal xim-horizontal">
                  <i>Total: </i>
                  <p class="xim-texto-resaltado">
                    {{ paymentResumeData.totalPromo | currency }}
                  </p>
                </span>
                <span class="xim-small-horizontal xim-obj-right">
                  <i>{{ $t('services_text.saving') }}:</i>
                  <p class="xim-texto-small-resaltado">
                    {{ paymentResumeData.totalDiscount | currency }}
                  </p>
                  <img
                    width="20px"
                    src="../../../../static/logos/icono_victo.svg"
                    alt="icono_victo"
                  />
                </span>
              </div>
            </v-col>

            <v-form class="xim-form" v-model="validForm2">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    outline-1
                    color="blue"
                    :rules="emailRules"
                    @input="
                      v => {
                        this.emailconfirmError =
                          this.confirmemail.toUpperCase() !== v.toUpperCase()
                      }
                    "
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="confirmemail"
                    @paste.prevent
                    label="Re-ingresar email"
                    outline-1
                    color="blue"
                    required
                    :hint="emailconfirmError ? 'E-mails no coinciden' : ''"
                    :error="emailconfirmError"
                    @input="
                      v => {
                        this.emailconfirmError =
                          this.email.toUpperCase() !== v.toUpperCase()
                      }
                    "
                  ></v-text-field>
                </v-col>
                <div class="col col-12">
                  <v-radio-group v-model="payMethod" :mandatory="true" row>
                    <v-row :key="index" v-for="(item, index) in payments">
                      <v-col cols="12">
                        <v-radio color="orange_dark" label="" :value="item.value">
                          <template v-slot:label>
                            <v-img
                              :src="`data:image/png;base64,${item.img}`"
                              :alt="item.alt"
                              class="xim-webpay-payment"
                            />
                          </template>
                        </v-radio>
                      </v-col>
                    </v-row>
                  </v-radio-group>
                </div>
                <v-col cols="12">
                  <v-form class="mt-5" v-model="validForm3">
                    <v-row>
                      <v-col cols="2">
                        <v-checkbox
                          color="orange_dark"
                          v-model="terms"
                          :rules="[v => !!v || '']"
                          required
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="10">
                        <label class="subheading"
                          >{{ $t('read_terms1') }}
                          <span class="termLink" @click="dialog = true">{{
                            $t('read_terms2')
                          }}</span>
                          {{ $t('read_terms3') }}</label
                        >
                      </v-col>
                      <v-col cols="12">
                        <div class="xim-full-width">
                          <v-btn text class="grey--text" @click="toServices">{{
                            $t('back')
                          }}</v-btn>
                          <v-btn
                            color="orange"
                            class="white--text mr-5"
                            :disabled="disabledButton"
                            :loading="loadingPayAction"
                            @click="pay"
                            >{{ $t('continue') }}</v-btn
                          >
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-col>
              </v-row>
            </v-form>
          </v-row>
        </v-container>
      </div>
    </v-card>

    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay="false"
      scrollable
    >
      <v-card>
        <v-toolbar dark class="orange">
          <v-btn icon @click.native="dialog = false" dark>
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('terms') }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <terms />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import InvalidConvenio from '@/views/Services/stepper/InvalidConvenioDiscount'
import Terms from '@/views/Services/Payment/Terms'
import { mapGetters } from 'vuex'
import APITransaction from '@/services/api/transaction'
import APIConvenio from '@/services/api/convenios'
import validations from '@/helpers/fieldsValidation'
import { getFinalPrice, getTarifaNormal, getTravelType } from '@/helpers/seatsUtils'
import _ from 'lodash'

export default {
  name: 'Payment',

  components: {
    Terms,
    InvalidConvenio
  },

  data() {
    return {
      convDialog: false,
      loadingRutValidation: false,
      loadingPayAction: false,
      selectedConvenio: '',
      selectedConvenioName: '',
      listaCovenios: [],
      listaDetalleConvenio: [],
      selectedSeats: this.$store.state.seats,
      rut: '',
      personalRut: this.$store.getters.payment_info.rut,
      payMethod: 'WBPAY',
      payments: [],
      terms: false,
      dialog: false,
      validForm: false,
      validForm2: false,
      validForm3: false,
      email: this.$store.getters.payment_info.email.toUpperCase(),
      confirmemail: '',
      movil: this.$store.getters.payment_info.movil,
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      emailRules: [v => !!v || 'E-mail es requerido', validations.emailValidation],
      emailconfirmError: false,
      see: true,
      password: '',
      passwordRules: [v => !!v || 'Ingrese contraseña', validations.passwordValidation],
      discountApplied: false
    }
  },

  computed: {
    ...mapGetters({
      payment_info: ['payment_info'],
      searching: ['getSearching']
    }),
    paymentResumeData() {
      let data = []
      let totalDiscountAgreement = 0
      let totalDiscount = 0
      let totalPromo = 0
      const normal_seats = [],
        promo_seats = []

      this.selectedSeats.forEach(seat => {
        const index = data.findIndex(
          item =>
            item.servicioNombre === seat.servicioNombre &&
            item.vuelta === (seat.vuelta || false) &&
            item.tomadoPromo === seat.tomadoPromo &&
            item.promo === getFinalPrice(seat)
        )

        if (index > -1) data[index].count += 1
        else {
          let discountPercentageAgreement = 0
          let discountPriceAgreement = 0

          const tarifaNormal = this.priceToNum(seat.tarifaNormal)
          const tarifa = this.priceToNum(seat.tarifa)
          const tarifaAnterior = this.priceToNum(seat.tarifaAnterior)
          let discountPricePromo = tarifaNormal - tarifa

          if (seat.discountAgreement) {
            discountPricePromo = tarifaNormal - tarifaAnterior
            discountPriceAgreement = this.priceToNum(seat.discountAgreement)

            discountPercentageAgreement = Math.floor(
              (discountPriceAgreement / tarifaNormal) * 100
            )
          }

          data.push({
            ...seat,
            vuelta: seat.vuelta || false,
            count: 1,
            promo: getFinalPrice(seat),
            base: getTarifaNormal(seat),
            discountPricePromo,
            discountPercentageAgreement,
            discountPriceAgreement,
            type: getTravelType(seat.vuelta, true)
          })
        }
      })

      // Preparar data de salida
      data.forEach(item => {
        if (item.tomadoPromo) promo_seats.push(item)
        else normal_seats.push(item)

        totalDiscountAgreement += item.discountPriceAgreement * item.count

        if (this.discountApplied && !item.tomadoPromo) {
          totalDiscount += item.discountPriceAgreement * item.count
        } else {
          totalDiscount += item.discountPricePromo * item.count
        }

        totalPromo += item.promo * item.count
      })

      return {
        normal_seats,
        promo_seats,
        totalPromo,
        totalDiscountAgreement,
        totalDiscount
      }
    },
    disabledButton() {
      //const checkForRut = this.selectedConvenio !== 'NA' ? this.validForm : true
      return (
        !this.validForm2 ||
        !this.validForm3 ||
        this.email.toUpperCase() !== this.confirmemail.toUpperCase() ||
        this.payMethod === ''
      )
    }
  },

  methods: {
    getDetalleConvenio() {
      this.getDatalleConvenioAtributo()
    },
    async getDatalleConvenioAtributo() {
      console.log(this.selectedConvenio)
      const response = await APIConvenio.getDetalleConvenioAtributo(this.selectedConvenio)
      const data = response.data
      this.listaDetalleConvenio = [...data]
      console.log(this.listaDetalleConvenio)
    },
    priceToNum(price) {
      if (typeof price === 'string') return parseInt(price.split('.').join(''))
    },
    showDialogOrValidate() {
      if (!this.discountApplied) {
        const withPromo = this.selectedSeats.filter(item => item.tomadoPromo)

        if (withPromo.length > 0) this.convDialog = true
        else this.validate()
      }
    },

    toServices() {
      localStorage.fromFail = true
      this.$router.push({ name: 'ServicesPaymentData' })
    },

    async validate() {
      try {
        this.loadingRutValidation = true
        var re = /\./gi
        const params = {
          descuento: '0',
          idConvenio: this.selectedConvenio,
          listaAtributo: [],
          listaBoleto: [],
          mensaje: '',
          montoTotal: '0',
          totalApagar: '0'
        }
        if (this.rut && this.rut != '') {
          params.listaAtributo.push({ idCampo: 'RUT', valor: this.rut })
        }
        if (this.username && this.username != '') {
          params.listaAtributo.push({ idCampo: 'USERNAME', valor: this.username })
        }
        if (this.password && this.password != '') {
          params.listaAtributo.push({ idCampo: 'PASSWORD', valor: this.password })
        }

        //console.log(this.selectedConvenio)
        this.selectedSeats.forEach(seat => {
          //console.log(seat)
          var fecha = seat.fechaPasada.split('/')
          params.listaBoleto.push({
            clase: seat.clase,
            descuento: '',
            destino: seat.destino,
            fechaSalida: fecha[2] + fecha[1] + fecha[0],
            idServicio: seat.servicio,
            origen: seat.origen,
            pago: seat.precio.replace(re, ''),
            piso: seat.piso,
            valor: seat.tarifaNormal.replace(re, ''),
            asiento: seat.asiento,
            promocion: '0',
            bus: seat.bus,
            horaSalida: seat.horaSalida.replace(':', ''),
            rut: seat.pasajero.numeroDocumento
          })
        })
        const response = await APIConvenio.getValidateConvenio(params)
        const data = response.data
        console.log('Data', data)
        if (response.data.mensaje == 'OK') {
          response.data.listaBoleto.forEach(salida => {
            console.log('SALIDA:: ', salida)
            this.selectedSeats.find(seat => {
              var fechaArr = seat.fechaPasada.split('/')
              var fecha = fechaArr[2] + fechaArr[1] + fechaArr[0]

              if (
                seat.servicio == salida.idServicio &&
                seat.origen == salida.origen &&
                seat.destino == salida.destino &&
                seat.asiento == salida.asiento &&
                fecha == salida.fechaSalida
              ) {
                seat.tarifaAnterior = seat.tarifa
                seat.tarifa = salida.pago
                seat.discountAgreement = salida.descuento

                this.discountApplied = true
              }
              seat.descuento = salida.descuento
            })
            console.log('OBJ:: ', this.selectedSeats)
          })

          this.$notify({
            group: 'info',
            title: 'Descuento aplicado',
            type: 'info'
          })
        } else {
          this.$notify({
            group: 'error',
            title: 'Validar convenio',
            type: 'error',
            text: `${response.data.mensaje}`
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingRutValidation = false
      }
    },

    async pay() {
      this.loadingPayAction = true
      this.makeTransaccion()
        .then(data => {
          this.$store.dispatch('SET_CAN_DOWNLOAD', {
            permission: 'OK',
            type: 'permission'
          })

          if (data.exito) {
            setTimeout(() => {
              const { url, token } = data
              let f = document.createElement('form')
              f.setAttribute('method', 'post')
              f.setAttribute('action', url)
              let i = document.createElement('input')
              i.setAttribute('type', 'text')
              i.setAttribute('name', 'TBK_TOKEN')
              i.setAttribute('value', token)
              f.appendChild(i.cloneNode())
              f.style.display = 'none'
              document.body.appendChild(f)
              f.submit()
              document.body.removeChild(f)
            }, 500)
          } else {
            this.$notify({
              group: 'error',
              title: 'Validar Compra',
              type: 'error',
              text: `${data.mensaje}`
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.loadingPayAction = false))
    },

    async makeTransaccion() {
      let listaCarrito = []
      this.selectedSeats.forEach(seat => {
        const params = _.pick(seat, [
          'servicio',
          'fechaServicio',
          'fechaPasada',
          'fechaLlegada',
          'horaSalida',
          'horaLlegada',
          'origen',
          'destino',
          'descuento',
          'empresa',
          'clase',
          'bus',
          'integrador',
          'codigoReserva'
        ])
        if (!seat.tomadoPromo) {
          params.monto = parseInt(seat.tarifaNormal.split('.').join(''))
          params.precio = parseInt(seat.tarifa.split('.').join(''))
        } else {
          params.monto = parseInt(seat.totalPromo.split('.').join(''))
          params.precio = parseInt(seat.totalPromo.split('.').join(''))
        }
        params.idaVuelta = seat.tomadoPromo
        params.piso = seat.piso + 1
        params.asiento =
          seat.piso === 1 ? parseInt(seat.asiento).toString() : seat.asiento
        params.datoConvenio = this.rut
        params.convenio = this.selectedConvenio
        params.pasajero = {
          comunaDestino: seat.pasajero.comunaDestino,
          comunaOrigen: seat.pasajero.comunaOrigen,
          documento: seat.pasajero.numeroDocumento,
          email: seat.pasajero.email,
          nacionalidad: seat.pasajero.nacionalidad,
          nombre: seat.pasajero.nombre,
          apellido: seat.pasajero.apellido,
          telefono: seat.pasajero.telefono,
          telefonoEmergencia: seat.pasajero.telefonoEmergencia,
          tipoDocumento: seat.pasajero.tipoDocumento
        }
        params.tipoServicio = seat.tipo
        params.asientoAsociado = seat.asientoAsociado ? seat.asientoAsociado : undefined; 
        listaCarrito.push(params)
      })
      const paymentInfo = {
        email: this.email,
        rut: this.personalRut,
        medioDePago: this.payMethod,
        puntoVenta: 'PUL',
        montoTotal: this.paymentResumeData.totalPromo,
        idSistema: process.env.ID_SISTEMA,
        codigoPais: '+569',
        numeroTelefono: '+569'
      }
      const transactionParams = { ...paymentInfo, listaCarrito }
      //console.log('transactionParams', transactionParams)
      const response = await APITransaction.post(transactionParams)
      return response.data
    }
  },

  created() {
    APIConvenio.getBotonPago().then(response => {
      const data = response.data.Convenio
      data.forEach(convenio => {
        if (convenio.BotonPago == 'SI') {
          this.payments.push({
            img: convenio.Imagen,
            value: convenio.Convenio,
            alt: convenio.Descripcion
          })
        }
      })
    })

    APIConvenio.getConvenios().then(response => {
      this.listaCovenios.push({
        img: '',
        value: '',
        alt: 'SIN CONVENIO'
      })
      const data = response.data
      data.forEach(convenio => {
        this.listaCovenios.push({
          img: convenio.imagenCarrusel,
          value: convenio.idConvenio,
          alt: convenio.convenio.descripcion
        })
      })
    })
  },

  watch: {
    payMethod(newMethod) {
      if (newMethod == 'BCNSD') {
        this.selectedConvenio = 'BCNSD'
        this.getDetalleConvenio()
      } else {
        if (this.selectedConvenio == 'BCNSD') {
          this.selectedConvenio = ''
        }
      }
    },
    selectedConvenio: function(newConvenio) {
      this.getDetalleConvenio()
      this.rut = ''
      this.password = ''
      this.selectedConvenioName = ''
      if (this.discountApplied) {
        this.selectedSeats.forEach(seat => {
          seat.tarifa = seat.precio
          delete seat.discountAgreement
        })
        this.discountApplied = false
      }
      this.listaCovenios.forEach(conv => {
        if (conv.value == newConvenio) {
          this.selectedConvenioName = conv.alt
        }
      })

      if (this.selectedConvenioName == '' && newConvenio == 'BCNSD') {
        this.selectedConvenioName = 'CENCOSUD'
      }

      if (newConvenio != 'BCNSD') {
        this.payMethod = 'WBPAY'
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/sass/colors.scss';
@import 'src/views/Services/stepper/List/ElementList.scss';

.checkbox {
  display: inline-block !important;
}
.termLink {
  color: var(--var-blue_light);
  text-decoration: underline;
}
.termLink:hover {
  cursor: pointer;
}

.webpay-payment {
  width: 150px;
}

.resume-data {
  padding: 20px 60px !important;

  .icon-cart {
    width: 100%;
    max-width: 400px;
    margin-right: 10px;
    margin-top: -60px;
  }

  .muted-resume-text {
    color: grey;
    font-size: 0.9rem;
  }
  .semimuted-resume-text {
    color: grey;
    font-size: 1.05rem;
  }
  .big-resume-text {
    font-size: 1.3rem;
    font-weight: 600;
  }

  .total-data {
    .col {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }
    .total {
      font-size: 2rem;
      color: $green;
      font-weight: 600;
    }
  }
}
</style>
