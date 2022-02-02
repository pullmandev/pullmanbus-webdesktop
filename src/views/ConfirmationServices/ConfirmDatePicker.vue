<template>
  <v-menu
    v-model="pickerMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    color="blue-dark"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        filled
        outlined
        dense
        :hide-details="automatic"
        label="Fecha"
        v-on="on"
        color="grey lighten-4"
        v-model="formatedDate"
        readonly
        :rules="rules"
      >
      </v-text-field>
    </template>
    <v-date-picker
      min="1920-01-01"
      v-model="date"
      :color="color || 'blue_dark'"
      :allowed-dates="enableToDate"
      :first-day-of-week="$i18n.locale === 'en' ? 0 : 1"
      :locale="$t('locale')"
    >
    </v-date-picker>
  </v-menu>
</template>
<script>
import moment from 'moment'
export default {
  props: ['automatic', 'value', 'rules', 'color'],
  data() {
    return {
      pickerMenu: false,
      innerDate: null
    }
  },
  computed: {
    date: {
      get() {
        if (this.automatic) {
          return this.$store.state.searchingConfirmation.date
        } else {
          return this.value
        }
      },
      set(value) {
        if (this.automatic) {
          this.$store.dispatch('SET_SEARCHING_CONFIRMATION', {
            date: value,
            type: 'date'
          })
          this.$store.dispatch('LOAD_CONFIRMATION_SERVICES_LIST', {
            date: value
          })
        } else {
          this.$emit('input', value)
        }
        this.pickerMenu = false
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
    }
  }
}
</script>
