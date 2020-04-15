<template v-if="direction">
  <div>
    <v-row row wrap>
      <v-col xs12 style="position: relative">
        <v-menu
          lazy
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
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
            slot="activator"
            :label="languageChange"
            v-model="formatedDate"
            readonly
          >
          </v-text-field>
        </template>
          <v-date-picker
            min="2017-01-24"
            @change="setDate"
            v-model="userCalendar"
            :allowed-dates="enableToDate"
            @input="setDate($event)"
            color="blue_dark"
            :locale="localeChange"
            :first-day-of-week="firstDayOfweek"
            clearable
          >
          </v-date-picker>
        </v-menu>
        <v-btn
          icon
          dark
          @click="clearDate"
          class="mt-3 pl-1 btn-picker"
          v-if="direction === 'from' ? false : userCalendarTo"
        >
          <v-icon>clear</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */

import { mapGetters } from 'vuex'
const moment = require('moment')

export default {
  props: ['direction', 'fromHome'],
  name: 'Calendar',
  data() {
    return {
      firstDayOfweek: 1,
      formattedDateFrom: null,
      formattedDateTo: null,
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
  methods: {
    setDate(date) {
      this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {
        date: date,
        direction: this.direction
      })
    },
    clearDate() {
      this.direction === 'from'
        ? (this.formattedDateFrom = null)
        : (this.formattedDateTo = null)
      this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {
        date: null,
        direction: this.direction
      })
    }
  },
  computed: {
    ...mapGetters({
      searching: ['getSearching']
    }),
    enableToDate() {
      if (this.direction === 'from') {
        const fromDate = moment().subtract(1, 'days')
        return date => {
          const diff = moment(date).diff(fromDate)
          return diff > -1
        }
      } else {
        const fromDate = this.searching.from_date
        return date => {
          const diff = moment(date).diff(fromDate)
          return diff > -1
        }
      }
    },
    userCalendar: {
      get() {
        if (this.direction === 'from') {
          if (!this.$store.state.searching.from_date) {
            this.formattedDateFrom = null
            return null
          }
          const format = this.fromHome ? 'dddd LL' : 'LL'
          this.formattedDateFrom = moment(
            this.$store.state.searching.from_date
          ).format(format)
          return this.$store.state.searching.from_date
        } else {
          if (this.$store.state.searching.to_date == null) {
            this.formattedDateTo = null
            return null
          }
          const format = this.fromHome ? 'dddd LL' : 'LL'
          this.formattedDateTo = moment(
            this.$store.state.searching.to_date
          ).format(format)
          return this.$store.state.searching.to_date
        }
      },
      set(value) {
        this.$store.dispatch('SET_NEW_USER_SEARCHING_DATE', {
          date: value,
          direction: this.direction
        })
      }
    },
    formatedDate: {
      get() {
        return this.direction === 'from' ? this.formattedDateFrom : this.formattedDateTo
      },
      set (value) {
        if (this.direction === 'from') {
          this.formattedDateFrom = value
        }
        else {
          this.formattedDateTo = value
        }
      }
    },
    localeChange() {
      this.firstDayOfweek = this.language === 'en' ? 0 : 1
      moment.locale(this.language)
      const format = this.fromHome ? 'dddd LL' : 'LL'
      if (this.$store.state.searching.from_date)
        this.formattedDateFrom = moment(
          this.$store.state.searching.from_date
        ).format(format)
      if (this.$store.state.searching.to_date)
        this.formattedDateTo = moment(
          this.$store.state.searching.to_date
        ).format(format)
      return this.translate('locale')
    },
    languageChange() {
      return this.direction === 'from'
            ? this.translate('from_date2')
            : this.translate('to_date2')
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
