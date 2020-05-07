<template>
  <div class="destinies-type-container pt-5">
    <h3 class="display-3 text-center" style="color: var(--var-blue_dark); font-size: 2rem !important;">
      {{ title }}
    </h3>
    <h4 class="headline text-center " style="color: var(--var-blue_light); font-size: 1.5rem !important;">
      {{ subTitle }}
    </h4>
    <v-container>
      <v-row no-gutters>
        <v-col cols="4" v-for="(item, index) of images" :key="index">
          <v-card class="mx-1">
            <a :href="links[index]" target="_blank">
            <v-img
              class="white--text align-end"
              :class="{ 'align-center': index === 5 }"

              :src="require(`../../static/images/${item}`)"
              height="350px"
            >

            </v-img>
            </a>
          </v-card>
        </v-col>
        <v-col cols="4" v-for="(item, index) of images" :key="index">
          <v-card class="mx-1">
              <v-card-title class="justify-center">
                <template v-if="index == 5">
                  {{ itemTitles[index] }}
                </template>
                <template v-else>
                  <div class="d-block text-center">
                    <span>
                    </span>
                    <p class="body-1">
                      {{ itemTitles[index] }}
                    </p>
                  </div>
                </template>
              </v-card-title>
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
    links: [String],
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
