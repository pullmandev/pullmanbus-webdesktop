<template>
  <div class="news-container pt-5">
    <h3 class="text-center blue--text" style="font-size: 2rem;" :style="titleStyle">
      {{ title }}
    </h3>
    <h4
      class="text-center orange--text"
      style="font-size: 1.5rem; font-weight: 400"
      :style="subTitleStyle"
    >
      {{ subTitle }}
    </h4>
    <v-container fluid class="pt-12" style="max-width: 1300px;">
      <carousel
        :per-page-custom="corrouselItemsPerPage"
        :mouse-drag="true"
        loop
        autoplay
        paginationActiveColor="#1110AD"
      >
        <slide
          v-for="(item, index) of items"
          :key="index"
          class="d-flex justify-center"
          style="overflow: visible"
        >
          <v-card
            class="mb-5 pa-2"
            :color="color"
            style="position: relative; box-shadow: 4px 3px 13px 0px rgba(0,0,0,0.3);"
          >
            <div
              class="pa-1 top-icon"
              :class="color"
              style="border-radius: 50%; z-index: 1000;"
            >
              <div :class="iconFillColor" style="border-radius: 50%">
                <v-icon :color="color" size="34">{{ icon }}</v-icon>
              </div>
            </div>
            <div
              class="pa-1 top-icon"
              :class="color"
              style="z-index: -1; border-radius: 50%; box-shadow: 4px 3px 21px -7px rgba(0,0,0,0.68);"
            >
              <div class="pa-1">
                <div style="width: 34px; height: 33px;" />
              </div>
            </div>
            <router-link :to="{ name: 'News' }">
              <v-img
                class="white--text align-end"
                :src="require(`../../static/images/home/slides/${item.img}`)"
                cover
                width="260px"
              >
              </v-img>
            </router-link>
            <v-card-text style="background-color: white; width:260px" :class="color">
              <div class="d-block" :class="`${secondColor}--text text-center`">
                <span v-if="item.title" class="d-block mb-1" style="font-size: 0.9rem">{{
                  item.title
                }}</span>
                <p class="body-2" v-html="item.content"></p>
              </div>
            </v-card-text>
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
    text: String,
    color: { type: String, default: 'white' },
    secondColor: { type: String, default: 'blue_light3' },
    icon: { type: String, default: 'mdi-bullhorn-outline' },
    titleStyle: String,
    subTitleStyle: String
  },
  components: {
    Carousel,
    Slide
  },
  computed: {
    iconFillColor() {
      let styles = ''
      styles = 'pa-1 '
      styles += this.color !== 'white' ? 'white' : this.secondColor
      return styles
    },
    applyTitleStyle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return false
        default:
          return true
      }
    },
    corrouselItemsPerPage() {
      const length = this.items.length
      let name = this.$vuetify.breakpoint.name
      let num
      if (name == 'xs'){
        num = 1
      } else if(name == 'sm'){
        num = 2
      }
      else if (name == 'md'){
        num = 3
      } else{
        num = 4
      }
      const md = length < num ? length : num
      return [
        [1400, md],
        [1000, md],
        [700, md],
        [600, md],
        [0, 1]
      ]
    }
  }
}
</script>
<style lang="scss">
.news-container {
  height: auto;
  width: 100vw;
  min-height: 55vh;
  margin: auto;
  .VueCarousel-wrapper {
    overflow: visible;
    .top-icon {
      position: absolute;
      top: -25px;
      left: 25px;
    }
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
}
@media (max-width: 960px){
  .news-container{
    margin-top: 80px !important;
  }
  .VueCarousel-wrapper{
    overflow: hidden !important;
  }
  .mb-5{
    margin-top: 34px;
  }
}
</style>
