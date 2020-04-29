<template>
  <div class="ServicesBackground font">
    <!-- Principal View -->
    <div style="margin-top: 52px"></div>
    <Promotions height="270" banner="true">
      <template slot="promotion">
        <p class="headline d-block">Aprovecha las promociones</p>
        <p class="display-2">Hasta 40% de descuento</p>
      </template>
    </Promotions>
    <router-view></router-view>
    <v-btn
      fab
      dark
      :large="windowSize.x > 960"
      color="orange"
      @click="showResume"
      class="floating-resume-btn"
    >
      <v-icon dark>shopping_cart</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      class="white--text floating-filters-btn displayNoneMd"
      @click="$router.push({ path: '/filters' })"
    >
      <v-icon dark>filter_list</v-icon>
      Filtros
    </v-btn>
    <v-btn
      fab
      dark
      color="primarylight"
      @click="$router.push({ path: '/mobile_search' })"
      :large="windowSize.x > 960"
      class="floating-search-btn displayNoneMd"
    >
      <v-icon dark>directions_bus</v-icon>
    </v-btn>
    <div style="height: 150px; background: var(--var-light);"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Promotions from '@/components/PromotionBanner'
import { mapGetters } from 'vuex'

export default {
  name: "Services",
  components: {
    Promotions
  },
  data () {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight }
    }
  },
  computed: mapGetters({
    resume: ['show_resume'],
    userData: ['userData']
  }),
  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    showResume () {
      if (!this.resume) {
        this.$notify({
          group: 'resume',
          title: this.translate('purchase_detail'),
          type: 'info'
        })
        this.$store.dispatch('SHOW_RESUME', {showResume: true})
      } else {
        this.$notify({ group: 'resume', clean: true })
        this.$store.dispatch('SHOW_RESUME', {showResume: false})
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style>
.floating-resume-btn {
  position: fixed !important;
  bottom: 0;
  right: 0;
  margin: 3rem !important;
  z-index: 5;
}
.floating-search-btn {
  position: fixed !important;
  bottom: 0;
  left: 0;
  margin: 3rem !important;
  z-index: 5;
}
.floating-filters-btn {
  position: fixed !important;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 3rem auto !important;
  z-index: 5;
}
.firstBanner {
  width: 100%;
}

.ServicesBackground {
  background: var(--var-light);
  min-height: 95vh;
}

.font {
  font-family: Poppins;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


