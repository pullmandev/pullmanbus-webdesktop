<template>
  <div class="mt-5">
    <by-time />
    <by-price />
    <!-- <by-company /> -->
    <by-service />
  </div>
</template>

<script>
import byPrice from './ByPrice'
import byTime from './ByTime'
import byService from '@/views/Services/filters/ByService'
export default {
  data() {
    return {}
  },
  components: {
    byPrice,
    byTime,
    byService
  },
  methods: {},
  computed: {}
}
</script>
