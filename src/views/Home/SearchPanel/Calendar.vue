<template v-if="direction">
  <div>
    <v-row dense>
      <v-col xs12 style="position: relative">
        <v-menu
          :close-on-content-click="true"
          transition="scale-transition"
          full-width
          color="blue-dark"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-on="on"
              dark
              color="grey lighten-4"
              :label="languageChange"
              v-model="formatedDate"
              readonly
            >
            </v-text-field>
          </template>
          <v-date-picker
            min="2017-01-24"
            v-model="userCalendar"
            :allowed-dates="enableToDate"
            color="blue_dark"
            :locale="localeChange"
            :first-day-of-week="firstDayOfweek"
            clearable
          >
          </v-date-picker>
        </v-menu>
        <v-btn icon dark @click="clearDate" class="mt-3 pl-1 btn-picker">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
const moment = require('moment')

export default {
  props: ['direction', 'fromDate', 'value'],
  name: 'Calendar',
  data() {
    return {
      firstDayOfweek: 1,
      formatedDate: null,
      allowedFromDates: []
    }
  },
  mounted() {
    let i = -1
    this.allowedFromDates = [...Array(90)].map(() => {
      return moment()
        .add(i++, 'd')
        .format('YYYY-MM-DD')
    })
  },
  computed: {
    enableToDate() {
      const fromDate =
        this.direction === 'from' ? moment().subtract(1, 'days') : this.fromDate
      return date => {
        const diff = moment(date).diff(fromDate) > -1 && this.lessThan45(date)
        return diff
      }
    },
    userCalendar: {
      get() {
        if (this.value == null) {
          this.formatedDate = null
        } else {
          this.formatedDate = moment(this.value).format('LL')
        }
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        // if (this.direction === 'from') {
        //   this.$store.dispatch('SET_HOME_BANNERS')
        // }
      }
    },
    localeChange() {
      this.firstDayOfweek = this.$i18n.locale === 'en' ? 0 : 1
      moment.locale(this.$i18n.locale)
      if (this.userCalendar)
        this.formatedDate = moment(this.userCalendar).format('LL')
      return this.$t('locale')
    },
    languageChange() {
      const result =
        this.direction === 'from' ? this.$t('from_date2') : this.$t('to_date2')

      return result
    }
  },
  methods: {
    clearDate() {
      this.formatedDate = null
      this.userCalendar = null
    },
    lessThan45(date) {
      const limit = moment().add(120, 'days')
      return moment(date).diff(limit, 'days') < 0
    }
  }
}
</script>
<style>
.btn-picker {
  position: absolute !important;
  top: 0;
  right: 0;
  margin-right: 2px !important;
}
</style>
