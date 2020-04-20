<template>
  <v-stepper :value="step" class="grey-color" id="paymentStepper">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="step > 1">
        <span v-lang.services></span>
        <small v-lang.select_services></small>
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="2" :complete="step > 2">
        <span>Confirmacion</span>
      </v-stepper-step>

      <!-- <v-divider></v-divider>

      <v-stepper-step step="3" :complete="step > 3">
        <span v-lang.buy></span>
        <small v-lang.buy_process></small>
      </v-stepper-step> -->
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <!-- List of Services -->
        <list :step="step" ref="serviceList" />
      </v-stepper-content>

      <v-stepper-content step="2">
        <!-- View of Pay -->
        <buy />
      </v-stepper-content>
      <!-- <v-stepper-content step="3">
        <services-payments />
      </v-stepper-content> -->
    </v-stepper-items>
  </v-stepper>
</template>

<script>
/* eslint-disable */
import {mapGetters} from 'vuex'
import buy from '@/views/Services/stepper/ConfirmationPaymentData'
import List from '@/views/Services/stepper/List/Index'
import ServicesPayments from '@/views/Services/stepper/Payment/Index'

export default {
  components: {
    ServicesPayments,
    List,
    buy
  },
  computed: mapGetters({
    step:'set_step'
  }),
  methods: {
    toPayment () {
      this.$router.push({ path: `/service_payments` })
    }
  }
};
</script>

<style>
.grey-color {
  background: var(--var-light) !important;
}
.font {
  font-family: Poppins;
}
</style>
