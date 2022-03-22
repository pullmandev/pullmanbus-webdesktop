<template v-if="direction">
  <div class="calendar_container">
    <v-row dense>
      <v-col xs12 style="position: center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          color="blue_dark"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="formatedDate"
              :label="languageChange"
              readonly
              v-bind="attrs"
              v-on="on"
              color="blue_dark"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="userCalendar"
            @input="menu = false"
            :locale="localeChange"
            :first-day-of-week="firstDayOfweek"
            color="blue_dark"
          ></v-date-picker>
          <v-btn icon @click="clearDate" style="margin-top: 17px" class="pl-1 btn-picker">
            <v-icon color="orange_dark">clear</v-icon>
          </v-btn>
        </v-menu>
        <!-- 
        <v-menu
          :close-on-content-click="false"
          transition="scale-transition"
          color="blue_dark"
          min-width="auto"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-on="on"
              color="blue_dark"
              :label="languageChange"
              v-model="formatedDate"
              readonly
              :rules="[(v) => !!v || '']"
            >
            </v-text-field>
          </template>
          <v-date-picker
            min="1900-01-01"
            v-model="userCalendar"
            color="blue_dark"
            :locale="localeChange"
            :first-day-of-week="firstDayOfweek"
          >
          <v-btn icon @click="clearDate" style="margin-top: 17px" class="pl-1 btn-picker">
            <v-icon color="orange_dark">clear</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialog.save(userCalendar)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        -->
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
      activePicker: null,
      date: null,
      menu: false,
      firstDayOfweek: 1,
      formatedDate: null,
      allowedFromDates: []
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
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
      if (this.userCalendar) this.formatedDate = moment(this.userCalendar).format('LL')
      return this.$t('locale')
    },
    languageChange() {
      const result = 'FECHA NACIMIENTO'
      return result
    }
  },
  methods: {
    clearDate() {
      this.formatedDate = null
      this.userCalendar = null
    },
    lessThan45(date) {
      const limit = moment().add(45, 'days')
      return moment(date).diff(limit, 'days') < 0
    },
    save(date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>
<style lang="scss">
@import '@/sass/colors.scss';
.btn-picker {
  position: absolute !important;
  top: 0;
  right: 0;
  margin-right: 2px !important;
}
.calendar_container {
  .mdi-close {
    color: $orange_dark !important;
  }
  input {
    color: $blue_dark !important;
  }
  label {
    color: $blue_dark !important;
  }
}
</style>
