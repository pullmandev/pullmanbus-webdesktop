<template>
  <v-container fluid class="d-flex justify-center">
    <v-card width="300" height="400" class="d-flex flex-column justify-center">
      <div class="d-flex justify-center">
        <v-img
          :src="img"
          class="white--text align-end"
          contain
          height="200px"
          max-width="250px"
          position="center center"
        >
        </v-img>
      </div>
      <div class="content-text-container">
        <v-card-text>
          <div class="d-block">
            <strong style="font-size: 0.9rem">{{ title }}</strong>
            <p class="body-2">
              {{ description }}
            </p>
          </div>
        </v-card-text>
      </div>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    title: String,
    description: String,
    img: String
  }
}
</script>
<style lang="scss" scoped>
.destinies-type-container {
  width: 100vw;
  min-height: 80vh;
}
.body-1 {
  word-break: break-word;
}
.content-text-container {
  position: relative;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  & div {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
</style>
