<template>
  <div>
    <v-img
      width="38"
      height="40"
      :src="
        require(`../../../../../static/logos/seats/Iconos-${imageToShow}.png`)
      "
      contain
      class="align-center"
    >
      <span class="white--text">{{ seatNumberToShow }}</span>
    </v-img>
  </div>
</template>

<script>
export default {
  props: ['seatNumber', 'floor', 'type'],
  computed: {
    seatNumberToShow() {
      let number = this.seatNumber.toString()
      if (this.floor > 0) {
        number = (parseInt(number)).toString()
      }
      return number
    },
    imageToShow() {
      if (this.type === 'occupied') {
        return 26
      } else if (this.type === 'taken') {
        return 27
      } else {
        return 28
      }
    }
  }
}
</script>

<style lang="stylus">
button.seatBtn.btn div svg.seatSizeDesktop text.seatText {
  opacity: 1;
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

.v-btn--floating .v-btn__content :not(:only-child):last-child {
  opacity: 1 !important;
  -webkit-transform: rotate(0deg) !important;
  transform: rotate(0deg) !important;
}

svg.selectedSeat {
  fill: #fff;
}

text.selectedSeat {
  fill: #fff;
}

.mobileSeat {
  transform: rotate(90deg);
}

button.seatBtn.btn div svg.seatSizeMobile text.seatText.mobileSeat {
  opacity: 1;
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
}


.seatSizeDesktop {
  width: 36px;
  fill: grey;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

@media screen and (max-width: 960px) {
  .seatSizeDesktop {
    width: 33px;
  }
}
.seatSizeMobile {
  width: 40px;
  margin-left: -10px;
  fill: grey;
  margin-top: 5px;
}

button.corridorDesktop {
  border-top-style: dashed;
  border-bottom-style: dashed;
  width: 60px;
  min-width: 0px;
}

button.corridorMobile {
  border-left-style: dashed;
  border-right-style: dashed;
  width: 55px;
  height: 55px;
  min-width: 0px;
}

.simbolSeat {
  width: 0px;
  fill: #000;
}
</style>
