<template>
  <div class="mt-5">
    <by-pet />
    <by-time />
    <by-price />
    <!-- <by-company /> -->
    <by-service />
  </div>
</template>

<script>
import byPet from './ByPet'
import byPrice from './ByPrice'
import byTime from './ByTime'
import byService from '@/views/Services/filters/ByService'
export default {
  data() {
    return {}
  },
  components: {
    byPet,
    byPrice,
    byTime,
    byService
  },
  methods: {},
  computed: {}
}
</script>
