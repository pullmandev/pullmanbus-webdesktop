<template>
  <div style="height: 100%;" class="d-flex align-center pt-5 satisfyFont">
    <div class="destinies-type-container d-flex align-center">
      <v-container fluid>
        <v-row>
          <v-col
            v-if="applyTitleStyle"
            cols="1"
            class="px-0"
            style="width: 0"
          />
          <v-col md="2" sm="12" v-for="(item, index) of images" :key="index">
            <v-card>
              <a :href="links[index]" target="_blank">
                <v-img
                  class="white--text align-end"
                  :src="require(`../../static/images/${item}`)"
                  cover
                  height="220px"
                >
                </v-img>
              </a>
              <v-card-text>
                <div class="d-block text-center">
                  <strong style="font-size: 1.2rem">{{
                    itemTitle[index]
                  }}</strong>
                  <p style="font-size: 0.92rem">
                    {{ itemContent[index] }}
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            v-if="applyTitleStyle"
            cols="1"
            class="px-0"
            style="width: 0"
          />
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    subTitle: String,
    itemTitle: Array,
    itemContent: Array,
    images: Array,
    links: Array,
    text: String
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
<style scoped>
.destinies-type-container {
  width: 100vw;
  min-height: 80vh;
  margin: auto;
}
.body-1 {
  word-break: break-word;
}
</style>
