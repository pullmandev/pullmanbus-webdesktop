<template>
  <div class="mt-5">
    <by-time />
    <by-price />
    <by-company />
    <by-service />
  </div>
</template>

<script>
import byPrice from './ByPrice'
import byTime from './ByTime'
import byCompany from '@/views/Services/filters/byCompany'
import byService from '@/views/Services/filters/ByService'
export default {
  data() {
    return {}
  },
  components: {
    byPrice,
    byTime,
    byCompany,
    byService
  },
  methods: {},
  computed: {}
}
</script>
