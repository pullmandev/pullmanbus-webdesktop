<template>
  <v-container fluid class="my-12">
    <h4
      class="headline text-center blue_light--text my-6"
      style="font-size: 1.5rem !important;"
    >
      Instagram
    </h4>
    <v-row>
      <v-col
        v-for="(item, index) of items"
        :key="index"
        class="d-flex justify-center"
      >
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import feed from '@/views/Home/SocialMedia/Instagram/InstagramFeed'
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    feed().then(result => {
      console.log('result', result)
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

<style lang="scss" scoped>
.body-1 {
  word-break: break-word;
}
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
</style>
