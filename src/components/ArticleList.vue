<template>
  <div style="height: 100%;" class="d-flex align-center pt-5 satisfyFont">
    <div class="destinies-type-container d-flex align-center">
      <v-container fluid class="mt-12">
        <carousel
          :per-page-custom="[
            [1400, 4],
            [1000, 3],
            [960, 2]
          ]"
          :mouse-drag="true"
          loop
          autoplay
          paginationActiveColor="#1110AD"
        >
          <slide
            v-for="(item, index) of items"
            :key="index"
            class="d-flex justify-center"
          >
            <v-card max-width="300" min-width="200" max-height="350">
              <a :href="item.link" target="_blank">
                <v-img
                  class="white--text align-end"
                  :src="item.img"
                  cover
                  height="220px"
                >
                </v-img>
              </a>
              <div class="article-text-container">
                <v-card-text
                  style="background-color: white; position: absolute; bottom: 0"
                >
                  <div class="d-block text-center">
                    <strong style="font-size: 1.2rem">{{ item.title }}</strong>
                    <div
                      style="font-size: 0.92rem"
                      class="text-left"
                      v-html="item.content"
                    ></div>
                  </div>
                </v-card-text>
              </div>
            </v-card>
          </slide>
        </carousel>
      </v-container>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  props: {
    title: String,
    subTitle: String,
    items: Array,
    text: String
  },
  components: {
    Carousel,
    Slide
  },
  computed: {
    applyTitleStyle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return false
        default:
          return true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.destinies-type-container {
  height: 0px;
  width: 100vw;
  min-height: 80vh;
  margin: auto;
}
.body-1 {
  word-break: break-word;
}
.article-text-container {
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
