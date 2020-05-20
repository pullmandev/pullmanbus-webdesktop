<template>
  <v-row>
    <v-col cols="12" sm="12" md="8" offset-md="2">
      <v-card class="mt-12">
        <v-toolbar
          dense
          class="elevation-0"
          dark
          color="blue_light"
          id="serviceToolbar"
        >
          <v-toolbar-title>
            <span class="title ml-3">
              Servicio por confirmar:
            </span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-form v-model="validForm">
              <v-row>
                <v-col cols="12" md="4">
                  <v-menu
                    v-model="pickerMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    color="blue-dark"
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        filled
                        outlined
                        dense
                        label="Fecha"
                        v-on="on"
                        color="grey lighten-4"
                        v-model="formatedDate"
                        readonly
                        :rules="generalRules"
                      >
                      </v-text-field>
                    </template>
                    <v-date-picker
                      min="1920-01-01"
                      v-model="date"
                      color="blue_dark"
                      :allowed-dates="enableToDate"
                      @input="pickerMenu = false"
                      :first-day-of-week="$i18n.locale === 'en' ? 0 : 1"
                      :locale="$t('locale')"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    filled
                    outlined
                    dense
                    v-model="ticket"
                    :label="$t('ticket')"
                    outline-1
                    color="blue"
                    :rules="generalRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    class="white--text"
                    :disabled="!validForm"
                    :loading="loadingServices"
                    color="blue_dark"
                    @click="validateSearch"
                  >
                    <span>Consultar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// Base components
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  props: ['type'],
  data() {
    return {
      pickerMenu: false,
      validForm: false,
      ticket: '',
      generalRules: [v => !!v || 'Este campo es requerido']
    }
  },
  computed: {
    ...mapGetters({
      loadingServices: ['getConfirmationLoadingService']
    }),
    date: {
      get() {
        return this.$store.state.searchingConfirmation.date
      },
      set(value) {
        this.$store.dispatch('SET_SEARCHING_CONFIRMATION', {
          date: value,
          type: 'date'
        })
      }
    },
    formatedDate() {
      moment.locale(this.$i18n.locale)
      return this.date != null ? moment(this.date).format('LL') : null
    },
    enableToDate() {
      const fromDate = moment().subtract(1, 'days')
      return date => {
        const diff = moment(date).diff(fromDate) > -1 && this.lessThan45(date)
        return diff
      }
    }
  },
  methods: {
    lessThan45(date) {
      const limit = moment().add(45, 'days')
      return moment(date).diff(limit, 'days') < 0
    },
    validateSearch() {
      this.$store.dispatch('SET_SEARCHING_CONFIRMATION', {
        ticket: this.ticket,
        type: 'ticket'
      })
      this.$store.dispatch('LOAD_CONFIRMATION_SERVICES_LIST')
    }
  }
}
</script>
<style lang="scss" scoped>
$padding: 100px;
.searchContainer {
  padding-top: $padding;
  padding-bottom: $padding;
  min-height: 100vh;
}
</style>
