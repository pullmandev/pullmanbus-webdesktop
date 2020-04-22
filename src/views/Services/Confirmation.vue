<template>
  <div>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid grid-list-lg>
          <v-layout column class="confirmation-title">
            <v-flex xs12 md12 lg12>
              <h1>Comprobando compra</h1>
            </v-flex>
            <v-flex xs12 md12 lg12> </v-flex>
            <v-flex xs12 class="text-xs-center">
              <v-progress-circular
                indeterminate
                :size="100"
                color="primary"
              ></v-progress-circular>
            </v-flex>
          </v-layout>
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
    API.postHeader({ orden: codigo })
      .then(response => {
        const boletos = response.data.boletos
        if (boletos && boletos.length > 0) {
          this.$router.push({ path: `/voucher/${codigo}` })
        } else {
          this.$router.push({ path: `/fail/${codigo}` })
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
  color: #8dcae2;
}
.confirmation-title p {
  font-size: 20px;
  color: #a0a0a0;
  text-align: center;
}
</style>
