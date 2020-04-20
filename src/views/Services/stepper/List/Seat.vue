<template>
  <div class="mr-2 mb-3">
    <svg
      v-if="type == 'symbol'"
      class="simbolSeat"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      style="enable-background:new 0 0 100 100;"
      xml:space="preserve"
    >
      <path
        d="M87.7,12.5c-0.8-3.7-4.1-6.6-8.2-6.6H36.9c-4,0-7.4,2.8-8.2,6.5h-17C8,12.5,5,15.4,5,19.1v61.7c0,3.7,3,6.6,6.7,6.6h16.9  c0.7,3.9,4.1,6.8,8.2,6.8h42.7c3.8,0,7-2.5,8-5.8c4.2-0.4,7.5-3.9,7.5-8.2V20.6C95,16.5,91.8,13,87.7,12.5z M36.9,8.8h42.7  c2.5,0,4.5,1.6,5.2,3.8c-3.3,0.8-5.8,3.5-6.3,6.8H36.9c-3,0-5.4-2.4-5.4-5.3S33.9,8.8,36.9,8.8z M28.7,84.5h-17  c-2.1,0-3.8-1.7-3.8-3.7V19.1c0-2.1,1.7-3.7,3.8-3.7h16.9c0.6,4,4.1,7,8.2,7h41.4v55.5H36.9C32.8,77.8,29.4,80.7,28.7,84.5z   M79.5,91.4H36.9c-3,0-5.4-2.4-5.4-5.3s2.4-5.3,5.4-5.3h41.5c0.2,3.6,2.8,6.5,6.2,7.4C83.7,90,81.8,91.4,79.5,91.4z M92.1,80.2  c0,2.9-2.4,5.3-5.4,5.3s-5.4-2.4-5.4-5.3V20.6c0-2.9,2.4-5.3,5.4-5.3s5.4,2.4,5.4,5.3V80.2z"
      ></path>
      <!-- <path class="st0" d="M30.2,14v11.2c0,0.9-0.1,1.7-0.4,2.5H3.9c-1.8,0-1.8-1.6-1.8-2.5V14c0-0.8,0.5-2.3,1.7-2.3h26
				C30.1,12.4,30.2,13.2,30.2,14z"/>
			<path class="st0" d="M30.4,33.5c-0.5,0.1-1,0.1-1.5,0.1h-14c-3.8,0-7-2.5-8-6h23.6"/>
			<path class="st0" d="M30.4,11.6H6.7c1-3.5,4.3-6.1,8.1-6.1h14c0.5,0,1,0,1.5,0.1"/>
			<path class="st0" d="M30.4,5.8c0-0.6,1-0.7,1.7-0.6c2.4,0.4,6,1.4,6,3.5c0,2.7,0,18,0,19.1c0,2.4-4,5.1-6.4,6
				c-0.5,0.2-1.3,0.3-1.3-0.3L30.4,5.8z"/> -->
    </svg>

    <svg
      v-if="type == 'desktop'"
      class="seatSizeDesktop"
      :class="{selectedSeat: seatNumber === selectedNumber}"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      style="enable-background:new 0 0 100 100;"
      xml:space="preserve"
    >
    <!-- Icono asiento  -->
      <path
        d="M87.7,12.5c-0.8-3.7-4.1-6.6-8.2-6.6H36.9c-4,0-7.4,2.8-8.2,6.5h-17C8,12.5,5,15.4,5,19.1v61.7c0,3.7,3,6.6,6.7,6.6h16.9  c0.7,3.9,4.1,6.8,8.2,6.8h42.7c3.8,0,7-2.5,8-5.8c4.2-0.4,7.5-3.9,7.5-8.2V20.6C95,16.5,91.8,13,87.7,12.5z M36.9,8.8h42.7  c2.5,0,4.5,1.6,5.2,3.8c-3.3,0.8-5.8,3.5-6.3,6.8H36.9c-3,0-5.4-2.4-5.4-5.3S33.9,8.8,36.9,8.8z M28.7,84.5h-17  c-2.1,0-3.8-1.7-3.8-3.7V19.1c0-2.1,1.7-3.7,3.8-3.7h16.9c0.6,4,4.1,7,8.2,7h41.4v55.5H36.9C32.8,77.8,29.4,80.7,28.7,84.5z   M79.5,91.4H36.9c-3,0-5.4-2.4-5.4-5.3s2.4-5.3,5.4-5.3h41.5c0.2,3.6,2.8,6.5,6.2,7.4C83.7,90,81.8,91.4,79.5,91.4z M92.1,80.2  c0,2.9-2.4,5.3-5.4,5.3s-5.4-2.4-5.4-5.3V20.6c0-2.9,2.4-5.3,5.4-5.3s5.4,2.4,5.4,5.3V80.2z"
      ></path>
      <!-- <path class="st0" d="M30.2,14v11.2c0,0.9-0.1,1.7-0.4,2.5H3.9c-1.8,0-1.8-1.6-1.8-2.5V14c0-0.8,0.5-2.3,1.7-2.3h26
				C30.1,12.4,30.2,13.2,30.2,14z"/>
			<path class="st0" d="M30.4,33.5c-0.5,0.1-1,0.1-1.5,0.1h-14c-3.8,0-7-2.5-8-6h23.6"/>
			<path class="st0" d="M30.4,11.6H6.7c1-3.5,4.3-6.1,8.1-6.1h14c0.5,0,1,0,1.5,0.1"/>
			<path class="st0" d="M30.4,5.8c0-0.6,1-0.7,1.7-0.6c2.4,0.4,6,1.4,6,3.5c0,2.7,0,18,0,19.1c0,2.4-4,5.1-6.4,6
				c-0.5,0.2-1.3,0.3-1.3-0.3L30.4,5.8z"/> -->
      <!-- Numeros asiento -->
      <text
        :class="{selectedSeat: seatNumber === selectedNumber}"
        class="seatText"
        :x="seatNumberToShow.space"
        y="60"
        fill="#000000"
        font-size="35px"
        font-weight="bold"
        font-family="Poppins"
      >{{seatNumberToShow.number}}</text>
      <!-- font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif" -->
    </svg>

    <svg
      v-if="type == 'mobile'"
      class="seatSizeMobile mobileSeat"
      :class="{selectedSeat: seatNumber === selectedNumber}"
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 125"
      style="enable-background:new 0 0 100 100;"
      xml:space="preserve"
    >
    <!-- Icono Asiento -->
      <path
        d="M87.7,12.5c-0.8-3.7-4.1-6.6-8.2-6.6H36.9c-4,0-7.4,2.8-8.2,6.5h-17C8,12.5,5,15.4,5,19.1v61.7c0,3.7,3,6.6,6.7,6.6h16.9  c0.7,3.9,4.1,6.8,8.2,6.8h42.7c3.8,0,7-2.5,8-5.8c4.2-0.4,7.5-3.9,7.5-8.2V20.6C95,16.5,91.8,13,87.7,12.5z M36.9,8.8h42.7  c2.5,0,4.5,1.6,5.2,3.8c-3.3,0.8-5.8,3.5-6.3,6.8H36.9c-3,0-5.4-2.4-5.4-5.3S33.9,8.8,36.9,8.8z M28.7,84.5h-17  c-2.1,0-3.8-1.7-3.8-3.7V19.1c0-2.1,1.7-3.7,3.8-3.7h16.9c0.6,4,4.1,7,8.2,7h41.4v55.5H36.9C32.8,77.8,29.4,80.7,28.7,84.5z   M79.5,91.4H36.9c-3,0-5.4-2.4-5.4-5.3s2.4-5.3,5.4-5.3h41.5c0.2,3.6,2.8,6.5,6.2,7.4C83.7,90,81.8,91.4,79.5,91.4z M92.1,80.2  c0,2.9-2.4,5.3-5.4,5.3s-5.4-2.4-5.4-5.3V20.6c0-2.9,2.4-5.3,5.4-5.3s5.4,2.4,5.4,5.3V80.2z"
      ></path>
      <!-- <path class="st0" d="M30.2,14v11.2c0,0.9-0.1,1.7-0.4,2.5H3.9c-1.8,0-1.8-1.6-1.8-2.5V14c0-0.8,0.5-2.3,1.7-2.3h26
				C30.1,12.4,30.2,13.2,30.2,14z"/>
			<path class="st0" d="M30.4,33.5c-0.5,0.1-1,0.1-1.5,0.1h-14c-3.8,0-7-2.5-8-6h23.6"/>
			<path class="st0" d="M30.4,11.6H6.7c1-3.5,4.3-6.1,8.1-6.1h14c0.5,0,1,0,1.5,0.1"/>
			<path class="st0" d="M30.4,5.8c0-0.6,1-0.7,1.7-0.6c2.4,0.4,6,1.4,6,3.5c0,2.7,0,18,0,19.1c0,2.4-4,5.1-6.4,6
				c-0.5,0.2-1.3,0.3-1.3-0.3L30.4,5.8z"/> -->
      <text
        :class="{selectedSeat: seatNumber === selectedNumber}"
        class="seatText mobileSeat"
        x="-70"
        y="60"
        fill="#000000"
        font-size="35px"
        font-weight="bold"
        font-family="Poppins"
      >{{seatNumberToShow.number}}</text>
    </svg>
  </div>
</template>

<script>
  export default {
    props: ['seatNumber', 'selectedNumber', 'floor', 'type'],
    computed: {
      seatNumberToShow () {
        let number = this.seatNumber.toString()
        let space = -60
        if (this.floor > 0){
          number = (parseInt(number) + 20).toString()
        }
        if (number.length > 1) {
          space = -70
        }
        return {number, space}
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