import Vue from 'vue'
import moment from 'moment'

Vue.filter('to12', function(value) {
  return moment(value, 'HH:mm').format('hh:mm a')
})
