<template>
  <v-container fluid class="my-12 px-0">
    <h4
      class="headline text-center blue_light--text my-6"
      style="font-size: 1.5rem !important;"
    >
      Instagram
    </h4>

    <v-img
      src="../../../../assets/images/home/networks/slide-2.jpg"
      class="d-flex justify-center align-center text-center white--text py-1"
    >
      <v-row>
        <v-col cols="1" />

        <v-col cols="4">
          <carousel
            :per-page="1"
            mouse-drag
            loop
            :autoplay="false"
            centerMode
            navigationEnabled
            :paginationEnabled="false"
          >
            <slide v-for="(item, i) of items" :key="i" class="d-flex justify-center">
              <v-card max-width="300" min-width="200" max-height="500">
                <a :href="item.url" target="_blank">
                  <v-img
                    class="white--text align-end"
                    :src="item.image"
                    cover
                    height="320px"
                  >
                  </v-img>
                </a>

                <div class="instagram-text-container">
                  <v-card-text
                    style="background-color: white; position: absolute; bottom: 0"
                  >
                    <div class="d-block text-center">
                      <div style="font-size: 0.92rem" class="text-left">
                        {{ formatText(item.caption) }}
                      </div>
                    </div>
                  </v-card-text>
                </div>
              </v-card>
            </slide>
          </carousel>
        </v-col>

        <v-col cols="7" />
      </v-row>
    </v-img>
  </v-container>
</template>

<script>
import feed from '@/views/Home/SocialMedia/Instagram/InstagramFeed'
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide
  },

  data() {
    return {
      items: []
    }
  },

  created() {
    feed().then(result => {
      // console.log('result', result)
      this.items = result.content
    })
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
  },

  methods: {
    formatText(text) {
      const length = 200
      let result = text

      if (text.length > length) {
        result = text.substr(0, length) + '...'
      }
      return result
    }
  }
}
</script>

<style lang="scss">
.instagram-text-container {
  height: 132px;
  width: 100%;
  position: relative;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  & div {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}

.VueCarousel {
  .VueCarousel-navigation {
    button.VueCarousel-navigation-button {
      color: #ffff !important;
      font-size: 25px;
      opacity: 0.6;
      transition: all 0.1s ease;

      &.VueCarousel-navigation-prev {
        &:active {
          padding-right: 14px !important;
        }
      }

      &.VueCarousel-navigation-next {
        &:active {
          padding-left: 14px !important;
        }
      }

      &:hover {
        opacity: 1;
      }

      &:focus {
        outline: none;
      }
    }
  }
}
</style>
