<template>
  <v-row>
    <v-col cols="2" class="pl-9 pr-0">
      <search-panel class="displayNoneSm"></search-panel>
      <filters class="displayNoneSm" />
    </v-col>
    <v-col cols="10">
      <stepper step="1" ref="stepper" />
    </v-col>
  </v-row>
</template>
<script>
import SearchPanel from '@/views/Services/searchPanel'
import Filters from '@/views/Services/filters/Index'
import Stepper from '@/views/Services/stepper/Index'
export default {
  components: {
    SearchPanel,
    Filters,
    Stepper
  }
}
</script>
