<template>
  <div class="destinies-type-container pt-5">
    <h3
      class="display-3 text-center"
      style="color: var(--var-blue_dark); font-size: 2rem !important;"
    >
      {{ title }}
    </h3>
    <h4
      class="headline text-center "
      style="color: var(--var-blue_light); font-size: 1.5rem !important;"
    >
      {{ subTitle }}
    </h4>
    <v-container fluid>
      <v-row class="mx-6">
        <v-col md="3" sm="12" v-for="(item, index) of images" :key="index">
          <v-card>
            <a :href="links[index]" target="_blank">
              <v-img
                class="white--text align-end"
                :src="require(`../../static/images/${item}`)"
                cover
                height="260px"
              >
              </v-img>
            </a>
            <v-card-text>
              <div class="d-block">
                <strong style="font-size: 0.9rem">{{
                  itemTitle[index]
                }}</strong>
                <p class="body-2">
                  {{ itemContent[index] }}
                </p>
              </div>
            </v-card-text>
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
    itemTitle: [String],
    itemContent: [String],
    images: [String],
    links: [String],
    text: String
  }
}
</script>
<style scoped>
.destinies-type-container {
  width: 100vw;
  min-height: 80vh;
}
.body-1 {
  word-break: break-word;
}
</style>
