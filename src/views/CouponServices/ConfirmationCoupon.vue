<template>
  <div>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid>
          <v-row class="confirmation-title orange--text">
            <v-col cols="12" md="12" lg="12">
              <h1>Comprobando compra</h1>
            </v-col>
            <v-col cols="12" md="12" lg="12"> </v-col>
            <v-col cols="12" class="text-center">
              <v-progress-circular
                indeterminate
                :size="100"
                color="blue_dark"
              ></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import API from '@/services/api/transaction'

export default {
  mounted() {
    const codigo = this.$route.params.id
    API.postHeaderCoupon({ orden: codigo })
      .then(response => {
        const boletos = response.data.boletos
        if (boletos && boletos.length > 0) {
          this.$router.push({ path: `/couponServices/voucherCoupon/${codigo}` })
        } else {
          this.$router.push({ path: `/couponServices/failCoupon/${codigo}` })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    toPDF(response) {
      // create a download anchor tag
      const tipo = response.tipo.toLowerCase()
      let downloadLink = document.createElement('a')
      downloadLink.target = '_blank'
      downloadLink.download = response.nombre

      // convert downloaded data to a Blob
      const blob = new Blob([this.toUint8Array(response.archivo)], {
        type: `application/${tipo}`
      })

      // create an object URL from the Blob
      let URL = window.URL || window.webkitURL
      const downloadUrl = URL.createObjectURL(blob)

      // set object URL as the anchor's href
      downloadLink.href = downloadUrl

      // append the anchor to document body
      document.body.append(downloadLink)

      // fire a click event on the anchor
      downloadLink.click()

      // cleanup: remove element and revoke object URL
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(downloadUrl)
    },
    toUint8Array(archivo) {
      const binary = atob(archivo)
      const length = binary.length
      const arrayBuffer = new ArrayBuffer(length)
      const uintArray = new Uint8Array(arrayBuffer)

      for (let i = 0; i < length; i++) {
        uintArray[i] = binary.charCodeAt(i)
      }

      return uintArray
    }
  }
}
</script>
<style scoped>
.center {
  margin-top: 8vh !important;
}
.confirmation-title h1,
.confirmation-title h3 {
  text-align: center;
  font-weight: bold !important;
}
.confirmation-title h1 {
  line-height: 4rem !important;
  font-size: 44px;
}
.confirmation-title p {
  font-size: 20px;
  color: #a0a0a0;
  text-align: center;
}
</style>
