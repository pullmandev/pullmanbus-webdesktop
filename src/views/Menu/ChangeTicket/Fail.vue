<template>
  <div>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid>
          <v-row column class="confirmation-title">
            <v-col cols="12" md="12" lg="12">
              <h1 class="blue_dark--text">{{ $t('fail_title_change') }}</h1>
            </v-col>
            <v-col cols="12" md="12" lg="12">
              <p>{{ $t('fail_detail_change') }}</p>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <div
                class="page-icon text-center d-flex align-center justify-center"
              >
                <v-icon size="70" class="white--text">clear</v-icon>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-btn class="white--text mt-5 blue_dark" @click="toServices">{{
        $t('back')
      }}</v-btn>
    </v-container>
  </div>
</template>
<script>
export default {
  methods: {
    toServices() {
      localStorage.fromFail = true
      this.$router.push({ path: 'changeTicket' })
    }
  }
}
</script>
<style scoped>
.page-icon {
  border-radius: 50%;
  width: 125px;
  height: 125px;
  background-color: var(--var-orange);
}
ol li {
  color: #a0a0a0;
}
.center {
  margin-top: 8vh !important;
}
.confirmation-title h1 {
  text-align: center;
  font-weight: bold !important;
}
.confirmation-title h1 {
  line-height: 4rem !important;
  font-size: 44px;
}
.confirmation-title p {
  font-size: 20px;
  color: #a0a0a0;
  text-align: center;
}
table {
  width: 100%;
  background-color: lightgray;
}
table td {
  color: grey;
  text-align: center;
}
</style>
