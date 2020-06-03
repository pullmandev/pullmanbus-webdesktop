<template>
  <v-container fluid>
    <v-card max-width="300">
      <v-img :src="img" class="white--text align-end" contain height="260px">
      </v-img>
      <div class="content-text-container">
        <v-card-text
          style="background-color: white; position: absolute; bottom: 0"
        >
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
  height: 132px;
  position: relative;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  & div {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
</style>
