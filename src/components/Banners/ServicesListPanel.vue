<template>
  <v-dialog
    v-model="promotion"
    overlay-color="blue_dark"
    :max-width="700"
    content-class="rounded-dialog-banner"
    persistent
  >
    <v-carousel cycle hide-delimiters :show-arrows="false" height="auto" class="xim-desktop">
      <v-carousel-item v-for="(item, i) in getServiceBanners" :key="i">
        <v-card color="white">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-img :src="item.urlImagen" height="350px" width="350px" cover></v-img>
            <v-row no-gutters>
              <v-col
                cols="12"
                class="d-flex flex-column justify-end align-center text-center"
              >
                <p class="headline d-block black--text">
                  {{ item.titulo }}
                </p>
                <p class="title px-3 black--text">
                  {{ getContent(item.contenido)[0] }}
                  <span
                    class="pl-1 mr-1"
                    :style="{
                      color: item.colorTarifa,
                      backgroundColor: item.fondoTarifa
                    }"
                    style="border-radius: 10px"
                  >
                    {{ getContent(item.contenido)[1] }}
                  </span>
                  {{ getContent(item.contenido)[2] }}
                </p>
              </v-col>
              <v-col cols="12" class="d-flex justify-space-around align-center">
                <v-btn outlined color="black" @click="promotion = false" min-width="100"
                  >No</v-btn
                >
                <v-btn color="orange" class="white--text" @click="accept" min-width="100">
                  Si
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-carousel-item>
    </v-carousel>
    <v-carousel cycle hide-delimiters :show-arrows="false" height="auto" class="xim-movile">
      <v-carousel-item v-for="(item, i) in getServiceBanners" :key="i">
        <v-card color="white">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-row no-gutters>
              <v-col cols="12">
                <v-img :src="item.urlImagen" class="xim-responsiva" cover></v-img>
              </v-col>
              <v-col
                cols="12"
                class="d-flex flex-column justify-end align-center text-center"
              >
                <p class="headline d-block black--text">
                  {{ item.titulo }}
                </p>
                <p class="title px-3 black--text">
                  {{ getContent(item.contenido)[0] }}
                  <span
                    class="pl-1 mr-1"
                    :style="{
                      color: item.colorTarifa,
                      backgroundColor: item.fondoTarifa
                    }"
                    style="border-radius: 10px"
                  >
                    {{ getContent(item.contenido)[1] }}
                  </span>
                  {{ getContent(item.contenido)[2] }}
                </p>
              </v-col>
              <v-col cols="12" class="d-flex justify-space-around align-center">
                <v-btn outlined color="black" @click="promotion = false" min-width="100"
                  >No</v-btn
                >
                <v-btn color="orange" class="white--text" @click="accept" min-width="100">
                  Si
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['open', 'seat'],
  computed: {
    ...mapGetters(['getServiceBanners']),
    promotion: {
      get() {
        return this.open
      },
      set(value) {
        this.$emit('update:open', value)
      }
    }
  },
  methods: {
    accept() {
      this.$emit('accept')
      this.promotion = false
    },
    getContent(content) {
      if (Object.keys(this.seat).length <= 0) {
        return ['', '', '']
      }
      const price =
        parseInt(this.seat.totalPromo.split('.').join('')) -
        parseInt(this.seat.tarifa.split('.').join(''))
      const priceText = this.$filters.currency(price)
      let result = content
      if (content.includes('${1}')) {
        const contentItems = content.split('${1}')
        contentItems.splice(1, 0, priceText)
        result = contentItems
      }
      return result
    }
  }
}
</script>
<style>
.rounded-dialog-banner {
  margin: 0 0 0 0;
  border-radius: 40px !important;
  overflow: hidden;
}
.xim-desktop {
  display: block;
}
.xim-movile {
  display: none;
}
@media (max-width: 768px) {
  .xim-desktop {
    display: block;
  }
  .xim-movile {
    display: none;
  }
}
@media (max-width: 576px) {
  .xim-desktop {
    display: none;
  }
  .xim-movile {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
  }
  .xim-responsiva {
    min-width: 100%;
    height: auto;
  }
}
</style>
