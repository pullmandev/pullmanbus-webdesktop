<template>
  <notifications
    group="load"
    :duration="1000"
    :width="windowSize.x <= 960 ? '100%' : 600"
    :ignoreDuplicates="true"
    animation-name="v-fade-left"
    position="bottom right"
  >
    <template slot="body" slot-scope="props">
      <div class="custom-template font pl-5">
        <div class="custom-template-icon">
          <v-progress-circular
            indeterminate
            :size="30"
            color="light"
          ></v-progress-circular>
        </div>
        <div class="custom-template-content">
          <div class="custom-template-title">
            {{ props.item.title }}
          </div>
        </div>
        <div class="custom-template-close displayNoneTiny" @click="props.close">
          <v-icon dark> clear </v-icon>
        </div>
      </div>
    </template>
  </notifications>
</template>
<script>
export default {
  data() {
    return {
      windowSize: { x: window.innerWidth, y: window.innerHeight }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
  }
}
</script>
<style scoped>
.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  font-size: 18px;
  color: #ffffff;
  margin: 5px;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
  background: var(--var-blue_dark);
  border: 1px solid grey;
  border-radius: 7px;
}
.custom-template,
.custom-template > div {
  box-sizing: border-box;
}
.custom-template .custom-template-icon {
  display: flex;
  align-content: center;
  color: var(--var-blue_light);
}
.custom-template .custom-template-close {
  flex: 0 1 auto;
  padding: 0 20px;
  font-size: 16px;
  opacity: 0.2;
  cursor: pointer;
}
.custom-template .custom-template-close:hover {
  opacity: 0.8;
}
.custom-template .custom-template-content {
  padding: 10px;
  flex: 1 0 auto;
}
.custom-template .custom-template-content .custom-template-title {
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
}
.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all 0.5s;
}
.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-500px) scale(0.2);
}
@media (max-width: 960px) {
  .custom-template {
    font-size: 14px;
  }
  .custom-template .custom-template-icon {
    font-size: 20px;
  }
  .custom-template .custom-template-close {
    font-size: 12px;
  }
  .custom-template .custom-template-content .custom-template-title {
    font-size: 14px;
  }
}
@media (max-width: 576px) {
  .custom-template {
    font-size: 0.9em;
    margin: 5px 18px 5px 5px;
  }
  .custom-template .custom-template-content {
    flex: 0 1 auto;
  }
  .custom-template .custom-template-icon {
    font-size: 0.9em;
  }
  .custom-template .custom-template-close {
    font-size: 0.9em;
  }
  .custom-template .custom-template-content .custom-template-title {
    font-size: 0.9em!important;
    text-transform: capitalize!important;
    text-align: center!important;
    min-height: 35px!important;
    height: auto!important;
    word-wrap: break-word!important;
    padding: 5px 0!important;
  }
  .custom-template-text {
    font-size: 0.9em!important;
    text-transform: capitalize!important;
    min-height: 35px!important;
    height: auto!important;
    word-wrap: break-word!important;
    padding: 5px 0!important;
    overflow: hidden;
  }
  .text-justificado {
    text-align: justify;
    padding: 0 5px 0 5px;
    word-wrap: break-word;
    height: auto!important;
  }
}
</style>
