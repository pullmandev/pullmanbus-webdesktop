<template>
  <div>
    <Promotions height="270" :banner="true">
      <template slot="promotion">
        <p class="headline d-block">Aprovecha las promociones</p>
        <p class="display-2">Hasta 40% de descuento</p>
      </template>
    </Promotions>
    <v-row>
      <v-col cols="12" sm="12" md="10" offset-md="1">
        <div class="mt-1 service-container-background">
          <v-toolbar
            dense
            class="elevation-0"
            dark
            color="blue_light"
            id="serviceToolbar"
          >
            <v-toolbar-title>
              <span class="title ml-3">
                Servicio por confirmar:
              </span>
            </v-toolbar-title>
          </v-toolbar>
          <List />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
/* eslint-disable */
import List from "@/views/ConfirmationServices/List/ElementList";
import Promotions from '@/components/PromotionBanner'
import moment from "moment";
import _ from 'lodash'

export default {
  components: {
    List,
    Promotions
  },
  data() {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight }
    };
  },
  mounted () {
    if (this.$store.state.confirmationServices.data.length < 1) {
      this.$store.dispatch('LOAD_CONFIRMATION_SERVICES_LIST')
    } else {
     this.$store.dispatch('DELETE_ALL_CONFIRMATION_SEAT')
    }
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy () { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {
    formatDate(date) {
      return moment(date).format('LL')
    },
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    }
  }
};
</script>

<style lang="scss">
.tab-custom {
  border: 0.5px solid lightgray;
  border-bottom: 0;
}

.tab-active {
  background: var(--var-blue_dark);
}

.icon-service-expanded {
  transform: rotate(90deg);
}

.icon-service {
  color: var(--var-red);
  font-size: 30px;
}

.service-company-image {
  margin-top: 20px;
  width: 100%;
  height: auto;
  max-width: 150px;
  max-height: 100px;
}

@media (max-width: 1060px) {
  .service-company-image {
    width: 100px;
    height: 25px;
  }
  .stepper__content {
    padding: 0px !important;
  }
}

@media (max-width: 1060px) {
  .service-company-image {
    width: 60px;
    height: 15px;
  }
  .expansion-panel__header {
    padding-left: 0px !important; 
    padding-right: 0px !important; 
  }
}
.service-item {
  margin-top: 10px;
  padding-top: 0;
  padding-bottom: 0;
}

.service-container-background {
  background-color: var(--var-light) !important;
}

.blue-dark {
  background-color: var(--var-dark-blue);
}

.noServices {
  min-height: 25vh;
}
.arrow .expansion-panel__header .icon {
  color: rgba(63, 12, 182, 0.54);
  font-size: 60px;
}

.arrow .expansion-panel__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  height: 110px;
}

.card__text {
  padding: 2px !important;
  width: 100%;
}


.result h1, h2, h3 {
  font-weight: 300 !important;
}

.datatable-container {
  background-color: white;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.15), 0 1px 10px 0 rgba(0, 0, 0, 0.15),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.datatable thead th.column.sortable {
  cursor: pointer;
}

/* estilo Bus */
.border-bus {
  border-bottom: 0px solid gray;
  border-top: 0px solid gray;
  
}

.min-h-30 {
  min-height: 30px;
}

.maxHeightLayout {
  max-height: 55vh;
  min-height: 55vh;
  overflow-y: scroll;
}
/* tamañp de grilla */
.flex.xs1 {
    -ms-flex-preferred-size: 4.333333333333332% !important;
    flex-basis: 4.333333333333332% !important;
    max-width: 4.333333333333332% !important;
    }

/* . estilo Bus */
</style>
