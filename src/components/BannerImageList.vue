<template>
  <div class="destinies-type-container pt-5">
    <h3 class="display-2 text-center" style="color: var(--var-blue_dark)">
      {{ title }}
    </h3>
    <h4 class="headline text-center my-5" style="color: var(--var-blue_light)">
      {{ subTitle }}
    </h4>
    <v-container>
      <v-row>
        <v-col cols="4" v-for="(item, index) of images" :key="index">
          <v-card max-width="344" class="mx-auto">
            <v-img
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :src="require(`../../static/images/${item}`)"
              height="200px"
            >
              <v-card-title>{{ itemTitles[index] }}</v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    subTitle: String,
    itemTitles: [String],
    images: [String],
    text: String
  }
}
</script>
<style scoped>
.destinies-type-container {
  width: 100vw;
  height: 80vh;
}
</style>
