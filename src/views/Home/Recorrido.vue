<template>
<div style="position: relative;">
  <Carousel />
  <v-container fluid class="search_container xim-movil-position">
    <div class="searchcontent" :style="{ marginTop: breakPoint.margin }" />
    <v-card style="background: transparent;" class="rounded-search-box card-frame-recorrido">
      <iframe id="recorrido-widget" frameborder="0" 
      src="https://viaje.pullmanbus.cl/es/widgets/search_white_label/pullman-bus?utm_campaign=whitelabel&amp;bgcolor=FF000000&amp;hide_headlines=true" 
      width="100%" height="400" scrolling="no"></iframe>
      <script src="https://white-label-scripts.s3.sa-east-1.amazonaws.com/pullmanbus.js" type="application/javascript"></script>

    </v-card>
  </v-container>
</div>
</template>
<script>
import Carousel from '@/components/Carousel'

export default ({
   components: {
    Carousel,
   },
    data: () => ({
    windowSize: { x: window.innerWidth, y: window.innerHeight }
  }),
   computed: {
      breakPoint() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
        case 'xs':
          return {
            margin: '100px',
            fontClass: 'headline'
          }
        default:
          return {
            margin: '48vh',
            fontClass: 'display-1'
          }
      }
    }
   },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
  }
})
</script>
<style lang="scss">
@import '@/sass/colors.scss';
.card-frame-recorrido{
  box-shadow:none !important;
}
.margin-search {
  margin-top: 50vh;
}
#frameRecorrido{
  padding-top:10px;
  height: 320px;
}
@media (max-width: 960px) {
  .margin-search {
    margin-top: 100px;
  }
}

@media (min-width: 960px) {
  .col-md-1.exchange {
    flex: 0 0 3%;
    max-width: 3%;
  }
}

@media (max-width: 960px){
  .searcherheader{
    flex-direction: column;
  }
  .searchcontent{
    margin-top: auto !important;
  }
  .py-0{
    max-width: 100% !important;
  }
  .blue_dark--text{
    text-align: center;
  }
  .petshcontainer{
    display: flex;
    flex-direction: column !important;
    align-items: center;
  }
  .petshcontent{
    text-align: center;
  }
}

@media (min-width: 600px) and (max-width: 960px) {
  .col-sm-2.exchange {
    flex: 0 0 4%;
    max-width: 4%;
  }
  .col-sm-5.city {
    flex: 0 0 48%;
    max-width: 48%;
  }
}
.center_layout {
  z-index: 2;
}

div.card.search_card {
  background-color: #194e8edd !important;
  color: #fff;
}

.search_container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  max-width: 1300px;
  .v-input--switch__thumb {
    color: $blue_dark !important;
  }
}

@media (max-width: 960px){
  .search_container{
    position: inherit;
  }
  .xim-movil-position {
    margin: 0% 0 0 0;
  }
}

.search-panel-radios .v-input--radio-group__input {
  justify-content: center;
}
.img-filtro {
  max-height: 32px;
}
.switch-pet {
  margin-top: 0px !important;
}

@media (max-width: 576px) {
  .xim-movil-position {
    margin: 0% 0 0 0;
  }
  #frameRecorrido{
  padding-top:10px;
  height: 400px;
}
}
</style>
