<template>
  <div class="destinies-type-container pt-5">
    <h3
      class="display-3 text-center blue_dark--text"
      style="font-size: 2rem !important;"
    >
      {{ title }}
    </h3>
    <h4
      class="headline text-center blue_light--text"
      style="font-size: 1.5rem !important;"
    >
      {{ subTitle }}
    </h4>
    <v-container fluid>
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
          class="d-flex justify-center
          "
        >
          <v-card max-width="342" class="mb-5">
            <a :href="item.link" target="_blank">
              <v-img
                class="white--text align-end"
                :src="item.img"
                cover
                height="260px"
              >
              </v-img>
            </a>
            <div class="article-text-container">
              <v-card-text
                style="background-color: white; position: absolute; bottom: 0"
              >
                <div class="d-block">
                  <strong style="font-size: 0.9rem">{{ item.title }}</strong>
                  <p class="body-2" v-html="item.content"></p>
                </div>
              </v-card-text>
            </div>
          </v-card>
        </slide>
      </carousel>
    </v-container>
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
