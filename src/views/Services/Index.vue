<template>
  <div class="ServicesBackground font">
    <!-- Principal View -->
    <div style="margin-top: 64px"></div>
    <v-content class="displayNoneSm">
      <Promotions height="270">
        <template slot="promotion">
          <p class="headline d-block">Aprovecha las promociones</p>
          <p class="display-2">Hasta 40% de descuento</p>
        </template>
      </Promotions>
    </v-content>
    <v-row>
      <v-col cols="2" class="pl-9 pr-0">
        <search-panel class="displayNoneSm"></search-panel>
        <filters class="displayNoneSm" />
      </v-col>
      <v-col cols="10">
        <stepper step="1" ref="stepper" />
      </v-col>
    </v-row>
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
    <div style="margin-top: 100px" class="displayNoneMd"></div>
  </div>
</template>
<script>
/* eslint-disable */
import SearchPanel from "@/views/Services/searchPanel"
import Filters from "@/views/Services/filters/Index"
import Stepper from "@/views/Services/stepper/Index"
import Promotions from '@/components/PromotionBanner'
import { mapGetters } from 'vuex'

export default {
  name: "Services",
  components: {
    SearchPanel,
    Filters,
    Stepper,
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
    const {fromFail} = localStorage
    if (fromFail || this.$route.query.fromLogin) {
      localStorage.removeItem('fromFail')
    } else if (this.$store.state.services.data.length < 1) {
      this.$store.dispatch('LOAD_SERVICES_LIST')
    } else {
      this.$store.dispatch('SET_PAYMENT_INFO', {
        payment_info: {
          name: '',
          rut: '',
          email: '',
          movil: '',
          completeName: ''
        }
      })
      this.$store.dispatch('DELETE_ALL_SEAT')
      this.$store.dispatch('SET_STEP', {step: 1})
    }
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


