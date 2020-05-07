<template>
  <div class="destinies-type-container pt-5">
    <h3 class="display-2 text-center" style="color: var(--var-blue_dark); font-size: 2.5rem !important;">
      {{ title }}
    </h3>
    <h4 class="headline text-center my-5" style="color: var(--var-blue_light)">
      {{ subTitle }}
    </h4>
    <v-container>
      <v-row no-gutters>
        <v-col cols="4" v-for="(item, index) of images" :key="index">
          <v-card class="mx-1">
            <v-img
              class="white--text align-end"
              :class="{ 'align-center': index === 5 }"
              gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.6)"
              :src="require(`../../static/images/${item}`)"
              height="350px"
            >
              <v-card-title class="justify-center">
                <template v-if="index !== 5">
                  {{ itemTitles[index] }}
                </template>
                <template v-else>
                  <div class="d-block text-center">
                    <span>
                      {{ itemTitles[index] }}
                    </span>
                    <!--p class="body-2 ma-12">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Repudiandae dolor maiores perferendis ad voluptates
                    </p-->
                    <v-btn dark color="blue_dark">
                      Más info.
                    </v-btn>
                  </div>
                </template>
              </v-card-title>
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
  height: 70vh;
}
</style>
