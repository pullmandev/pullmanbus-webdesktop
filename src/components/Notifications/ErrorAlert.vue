<template>
  <notifications
    group="error"
    :duration="3000"
    :width="windowSize.x <= 960 ? '80%' : 700"
    :ignoreDuplicates="true"
    animation-name="v-fade-left"
    position="top center"
  >
    <template slot="body" slot-scope="props">
      <div class="custom-template font red accent-4">
        <div class="custom-template-icon displayNoneTiny">
          <v-icon dark large> error_outline </v-icon>
        </div>
        <div class="custom-template-content">
          <div class="custom-template-title">
            {{ props.item.title }}
          </div>
          <div class="custom-template-text" v-html="props.item.text" />
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
<style>
.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  font-size: 18px;
  color: #ffffff;
  margin: 5px;
  margin-top: 50px;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 7px;
}
.custom-template,
.custom-template > div {
  box-sizing: border-box;
}
.custom-template .custom-template-icon {
  display: flex;
  font-size: 32px;
  align-content: center;
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
</style>
