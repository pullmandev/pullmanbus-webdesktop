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
      <v-row class="mx-6">
        <v-col md="3" sm="12" v-for="(item, index) of images" :key="index">
          <v-card>
            <a
              v-if="links[index] !== 'Dialog'"
              :href="links[index]"
              target="_blank"
            >
              <v-img
                class="white--text align-end"
                :src="require(`../../static/images/${item}`)"
                cover
                height="260px"
              >
              </v-img>
            </a>
            <v-img
              v-else
              class="white--text align-end"
              :src="require(`../../static/images/${item}`)"
              cover
              height="260px"
              @click="$emit('dialog')"
            >
            </v-img>
            <div class="content-text-container">
              <v-card-text
                style="background-color: white; position: absolute; bottom: 0"
              >
                <div class="d-block">
                  <strong style="font-size: 0.9rem">{{
                    itemTitle[index]
                  }}</strong>
                  <p class="body-2">
                    {{ itemContent[index] }}
                  </p>
                </div>
              </v-card-text>
            </div>
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
    itemTitle: Array,
    itemContent: Array,
    images: Array,
    links: Array,
    text: String
  }
}
</script>
<style lang="scss" scoped>
.destinies-type-container {
  width: 100vw;
  min-height: 80vh;
}
.body-1 {
  word-break: break-word;
}
.content-text-container {
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
