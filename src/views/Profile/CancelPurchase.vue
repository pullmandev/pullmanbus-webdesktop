<template>
  <v-container class="xim-container-i">
    <h1 class="blue--text mb-6 mt-50">{{ $t('cancellations') }}</h1>
    <v-card class="rounded-search-box">
      <v-toolbar color="orange" class="white--text elevation-0">
        <div style="width: 50px">
          <v-img
            src="../../../static/logos/header/Iconos-24.png"
            height="35"
            width="35"
          />
        </div>
        <v-toolbar-title>
          <h2 class="d-flex flex-column text-left title" style="line-height: 20px">
            {{ formTitle }}
            <span v-if="userData.usuario.nombre" class="body-2">{{ email }}</span>
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <p class="subheading">
          Debe seleccionar el o los boletos que desea anular para la devolución de su
          dinero. La devolución debe ser realizada por lo menos 4 hrs. antes de la salida
          del servicio.
        </p>
        <form>
          <v-row>
            <v-col cols="12" sm="6" md="6" class="pl-3 pr-3 d-flex">
              <v-text-field
                filled
                outlined
                dense
                label="Código de transacción"
                v-model="code"
                :disabled="!search"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" class="pl-3 pr-3">
              <v-btn
                @click="getTicket"
                color="blue"
                :loading="loading"
                class="white--text"
              >
                <span>{{ search ? 'Consultar' : 'Borrar' }}</span>
              </v-btn>
            </v-col>
          </v-row>
        </form>

        <v-data-table
          mobile-breakpoint="0"
          :headers="headers"
          :items="tickets"
          hide-default-footer
          class="elevation-0 purchase-table mb-3 mt-2"
        >
          <template slot="headerCell" slot-scope="props">
            <span class="purchase-table-header">
              {{ props.header.text }}
            </span>
          </template>
          <template slot="item" slot-scope="props">
            <tr class="columnflex">
              <td class="altext">{{ props.item.boleto }}</td>
              <td class="altext">{{ props.item.fechaHoraSalida }}</td>
              <td class="altext pa-1">
                {{ props.item.nombreTerminalOrigen }}
              </td>
              <td class="altext pa-1">
                {{ props.item.nombreTerminalDestino }}
              </td>
              <td class="altext">{{ props.item.asiento }}</td>
              <td class="altext pa-2">
                {{ props.item.total }}
              </td>
              <td class="altext">
                <v-checkbox
                  v-if="props.item.puedeImprimir"
                  :disabled="props.item.tipoServicio == 'pet'"
                  color="blue_dark"
                  v-model="props.item.anular"
                  v-on:change="anular(props.item)"
                ></v-checkbox>
              </td>
              <td class="altext">
                <v-img
                  v-if="props.item.tipoServicio === 'pet'"
                  width="42px"
                  title="Asiento Mascota"
                  src="../../../static/logos/seats/icono_pata_verde.svg"
                />
              </td>
            </tr>
          </template>
        </v-data-table>
        <i class="subheading" v-if="tickets.length > 0">
          *Si la compra se realizo con tarjeta de crédito, se generará una reversa en su
          cuenta, si se realizo con tarjeta de débito, se realizará una transferencia a la
          cuenta que entregue para este fin. La devolución o reversa se hara efectiva en
          un plazo máximo de 5 días
        </i>
        <v-form v-model="validForm" v-if="viewForm">
          <v-row align="center" class="mt-5">
            <v-col cols="12" md="6" class="pl-3 pr-3">
              <v-autocomplete
                filled
                outlined
                dense
                label="Tipo de cuenta"
                :items="accountTypes"
                v-model="selectedAccountType"
                item-text="nombre"
                item-value="codigo"
                clearable
                :rules="generalRules"
                required
                :disabled="loadingCancel"
              ></v-autocomplete>
            </v-col>
            <template v-if="tickets[0].tipoCompra === 'VD'">
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  label="Rut solicitante"
                  v-model="rutApplicant"
                  :rules="rutApplicantRules"
                  required
                  :disabled="loadingCancel"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  label="Usuario"
                  v-model="name"
                  :rules="emailRules"
                  required
                  :disabled="loadingCancel"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  label="RUT de titular de cuenta"
                  v-model="rutHolder"
                  :rules="rutRules"
                  required
                  :disabled="loadingCancel"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  label="Numero de cuenta"
                  v-model="accountNumber"
                  :rules="generalRules"
                  required
                  :disabled="loadingCancel"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-autocomplete
                  filled
                  outlined
                  dense
                  label="Banco"
                  :items="banks"
                  v-model="selectedBank"
                  item-text="nombre"
                  item-value="codigo"
                  clearable
                  autocomplete
                  :rules="generalRules"
                  required
                  :disabled="loadingCancel"
                ></v-autocomplete>
              </v-col>
            </template>
          </v-row>
          <v-btn
            @click="submit"
            color="blue_dark"
            class="white--text"
            :disabled="!validForm || code === '' || !hasNullable"
            :loading="loadingCancel"
          >
            Anular
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
// Base component
import API from '@/services/api/cancel'
import moment from 'moment'
import { mapGetters } from 'vuex'
import validations from '@/helpers/fieldsValidation'
import scrollAnimation from '@/helpers/scrollAnimation'

export default {
  data() {
    return {
      email: '',
      loading: false,
      loadingCancel: false,
      search: true,
      validForm: false,
      code: '',
      name: '',
      accountNumber: '',
      rutHolder: '',
      rutApplicant: '',
      tickets: [],
      accountCreditTypes: [],
      accountDebitTypes: [],
      banks: [],
      selectedAccountType: '',
      selectedBank: '',
      selectedPurchase: 'Credito',
      generalRules: [v => !!v || 'Este campo es requerido'],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => v === this.userData.usuario.email || 'E-mail no coincide con su usuario'
      ],
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      rutApplicantRules: [
        v => !!v || 'Rut es requerido',
        v => v === this.userData.usuario.rut || 'Rut no coincide con su usuario'
      ],
      headers: [
        {
          text: 'Boleto',
          align: 'left',
          sortable: false,
          value: 'boleto'
        },
        {
          text: 'Fecha',
          value: 'fechaHoraSalida',
          align: 'left',
          sortable: false
        },
        {
          text: 'Origen',
          value: 'nombreTerminalOrigen',
          align: 'left',
          sortable: false
        },
        {
          text: 'Destino',
          value: 'nombreTerminalDestino',
          align: 'left',
          sortable: false
        },
        {
          text: 'Asiento',
          value: 'asiento',
          align: 'left',
          sortable: false
        },
        {
          text: 'Valor',
          value: 'total',
          align: 'left',
          sortable: false
        },
        {
          text: '',
          value: '',
          align: 'left',
          sortable: false
        },
        {
          text: '',
          value: '',
          align: 'left',
          sortable: false
        }
      ]
    }
  },
  created() {
    this.getParameters()
  },
  computed: {
    ...mapGetters({
      userData: ['userData']
    }),
    formTitle() {
      
      let { nombre, apellidoPaterno } = this.userData.usuario
      let title = null
      if (nombre) {
        title = nombre
        if (apellidoPaterno) {
          title += ' ' + apellidoPaterno
        }
      }
      return title != null ? title : this.email
    },
    viewForm() {
      if (this.tickets.length <= 0) {
        return false
      }
      const puedeImprimir = this.tickets.filter(item => item.puedeImprimir)
      return puedeImprimir.length > 0
    },
    hasNullable() {
      if (this.tickets.length <= 0) {
        return false
      }
      const nullable = this.tickets.filter(item => item.anular)
      return nullable.length > 0
    },
    accountTypes() {
      if (this.tickets.length <= 0) {
        return []
      }
      if (this.tickets[0].tipoCompra === 'VD') {
        return this.accountDebitTypes
      } else {
        return this.accountCreditTypes
      }
    }
  },
  methods: {
    async getParameters() {
      const { usuario } = this.userData
      this.email = usuario.email
      const accountCreditTypesRes = await API.tipoCuenta({ codigo: 'VC' })
      const accountDebitTypesRes = await API.tipoCuenta({ codigo: 'VD' })
      const banksRes = await API.bancos()
      this.accountCreditTypes = accountCreditTypesRes.data
      this.accountDebitTypes = accountDebitTypesRes.data
      this.banks = banksRes.data
    },
    async getTicket() {
      try {
        if (this.search) {
          this.loading = true
          
          const params = {
            codigo: this.code.trim()
          }
          const response = await API.searchTicket(params)
          if (response.data.length <= 0) {
            this.$notify({
              group: 'error',
              title: 'No se encontraron tickets',
              type: 'error',
              text: 'Verifique el codigo e intentelo de nuevo'
            })
          }
          this.tickets = response.data.map(item => {
            const { fechaHoraSalida } = item.imprimeVoucher
            const dateNumber = fechaHoraSalida.slice(0, 8)
            const hourNumber = fechaHoraSalida.slice(8, fechaHoraSalida.length)
            const date = moment(dateNumber).format('DD/MM/YYYY')
            const hour = `${hourNumber.slice(0, 2)}:${hourNumber.slice(2, 4)}`
            item.fechaHoraSalida = date + ' ' + hour
            item.nombreTerminalOrigen = item.imprimeVoucher.nombreTerminalOrigen
            item.nombreTerminalDestino = item.imprimeVoucher.nombreTerminalDestino
            item.asiento = item.imprimeVoucher.asiento
            item.total = item.imprimeVoucher.total.includes('.')
              ? `$ ${item.imprimeVoucher.total}`
              : this.$filters.currency(item.imprimeVoucher.total)
            item.codigoTransaccion = item.imprimeVoucher.codigoTransaccion
            item.anular = false
            return item
          })
          this.name = this.userData.usuario.email
          this.rutApplicant = this.userData.usuario.rut
          if (this.tickets.length > 0) {
            this.search = false
          }
        } else {
          //console.log(this.tickets)
          this.clearTicketData()
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    anular(item) {
      console.log(item)
      if (item.tipoServicio === 'asociado') {
        //console.log(item.asientoAsociado + " - " + item.imprimeVoucher.servicio + " - " + item.imprimeVoucher.fechaHoraSalida);
        for (const ticket of this.tickets) {
          //console.log(ticket.asientoAsociado + " - " + ticket.imprimeVoucher.servicio + " - " + ticket.imprimeVoucher.fechaHoraSalida);
          if (
            item.asientoAsociado == ticket.asiento &&
            item.imprimeVoucher.servicio == ticket.imprimeVoucher.servicio &&
            item.imprimeVoucher.fechaHoraSalida == ticket.imprimeVoucher.fechaHoraSalida
          ) {
            ticket.anular = item.anular
            //console.log("ok")
          }
        }
      }
    },
    clearTicketData() {
      this.code = ''
      this.tickets = []
      this.search = true
      this.clearData()
    },
    clearData() {
      this.accountNumber = ''
      this.rutHolder = ''
      this.selectedAccountType = ''
      this.selectedBank = ''
      this.arrayBoleto = []
      this.puedeImprimir = false
      this.integrador = ""
      this.dataRespuesta
    },
    async submit() {
      try {
        if (this.loadingCancel) {
          return
        }
        this.loadingCancel = true
        this.loadingCancel = true
        const length = this.tickets.length

        this.arrayBoleto = []
        this.puedeImprimir = false
        this.integrador = ""
        this.usuarioNombre = ""

        for (let index = 0; index < length; index++) {
          if (!this.tickets[index].anular) {
            continue
          }else{

            this.arrayBoleto.push(this.tickets[index].boleto)
            this.puedeImprimir = this.tickets[index].puedeImprimir
            this.integrador = this.tickets[index].integrador
          }
        }

          this.usuarioNombre = `${this.userData.usuario.nombre} ${this.userData.usuario.apellidoPaterno}`
          console.log(this.arrayBoleto)
          let params = {
            boleto: this.arrayBoleto,
            codigoTransaccion: this.code.trim(),
            integrador: this.integrador,
            tipoCuenta: this.selectedAccountType,
            banco: '',
            numeroCuenta: '',
            rutTitular: '',
            rutSolicitante: '',
            usuario: ''
          }
          params.rutSolicitante = this.rutApplicant
          params.usuario = this.usuarioNombre
          //if (this.tickets[index].tipoCompra === 'VD') {
            params.banco = this.selectedBank
            params.numeroCuenta = this.accountNumber
            params.rutTitular = this.rutHolder
            params.email = this.userData.usuario.email
          //}
          console.log(params)
          const response = await API.cancel(params)
          console.log(response.data)

          this.dataRespuesta = response.data

          console.log(this.dataRespuesta)

          for (let index = 0; index < this.dataRespuesta.length; index++) {
            this.boletoValidacion = this.dataRespuesta[index].boleto
            console.log(this.boletoValidacion)

            if (this.dataRespuesta[index].exito) {
              this.$notify({
                group: 'info',
                title: this.$t('cancellations_success'),
                type: 'info'
              })
              for (let index = 0; index < length; index++) {
                if (this.tickets[index].boleto === this.boletoValidacion) {
                  this.tickets[index].puedeImprimir = false
                }
              }

              //await API.sendEmail({
              //  email: this.userData.usuario.email
              //})
            } else {
              const text =
                this.dataRespuesta[index].mensaje != null
                  ? this.dataRespuesta[index].mensaje
                  : this.$t('cancellations_error')
              this.$notify({
                group: 'error',
                title: this.$t('cancellation'),
                type: 'error',
                text
              })
            }
          }
        this.clearData()
      } catch (err) {
        console.log(err)
      } finally {
        scrollAnimation('#profile')
        this.loadingCancel = false
      }
    }
  }
}
</script>

<style>
.purchase-table thead {
  background-color: var(--var-light-blue) !important;
}
.purchase-table-header {
  color: white;
  font-size: 16px;
}
.altext{
  text-align: left;
}
@media (max-width: 700px) {
  .altext{
    text-align: center;
  }
  .columnflex{
    display: flex;
    flex-direction: column;
  }
}
</style>
