<template>
  <div style="height: 100vh" class="d-flex align-center">
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid grid-list-lg>
          <v-row class="confirmation-title">
            <v-col cols="12">
              <p v-lang.error_404></p>
            </v-col>
            <v-col cols="12">
              <h1 class="error-title orange--text text-center">
                404
              </h1>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-btn
        color="blue_dark"
        class="white--text mt-5"
        @click="$router.push({ path: '/' })"
        v-lang.back
      ></v-btn>
    </v-container>
    <div style="height: 150px;"></div>
  </div>
</template>
<style scoped>
.error-title {
  font-size: 100px;
}
.center {
  margin-top: 8vh !important;
}
.confirmation-title h3 {
  text-align: center;
  font-weight: bold !important;
}
.confirmation-title p {
  font-size: 20px;
  color: #a0a0a0;
  text-align: center;
}
</style>
