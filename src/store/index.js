/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import APIService from '@/services/api/services'
import APICities from '@/services/api/cities'
import APIConfirmation from '@/services/api/confirmationTicket'
import createBanners from '@/helpers/createBanners'
import router from '../router'
import moment from 'moment'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: [
        'language',
        'searching',
        'searchingConfirmation',
        'cities',
        'citiesTo',
        'seats',
        'confirmationSeats',
        'step',
        'payment_info',
        'userData',
        'cuponera',
        'cuponeraTo',
        'userCoupon'
      ]
    })
  ],

  state: {
    language: 'es',
    sessionDialog: {
      dialogType: '',
      open: false
    },
    cities: [],
    citiesTo: [],
    citiesConfirmation: [],
    citiesToConfirmation: [],
    cuponera: [],
    cuponeraTo: [],
    searching: {
      from_city: null,
      to_city: null,
      from_date: null,
      to_date: null,
      petService: false
    },
    searchingFromToConfirmation: {
      searchingCity: {}
    },
    searchingConfirmation: {
      ticket: {},
      date: null
    },
    services: {
      data: [],
      loading: false,
      selected: false,
      showResume: false,
      tab: 'Ida',
      banners: [],
      floorBanners: [],
      paymentBanners: []
    },
    confirmationServices: {
      data: [],
      loading: false
    },
    confirmationSeats: [],
    serviceFilters: {
      class: [],
      selectedClass: 'Todos',
      prices: {
        min: 500,
        max: 60000
      },
      hours: {
        min: 0,
        max: 1439
      }
      // companies: [],
      // selectedCompany: 'Todos'
    },
    selected: false,
    grid: [],
    seats: [],
    step: 1,
    payment_info: {
      name: '',
      rut: '',
      email: '',
      movil: '',
      completeName: ''
    },
    userCoupon:{
      documento: '',
      email: '',
      nacionalidad: '',
      nombre: '',
      apellido: '',
      direccion: '',
      active: false
    },
    userData: {
      cambiaClave: false,
      payment_info: {},
      token: '',
      urlInicial: null,
      usuario: {},
      active: false
    },
    homeBanners: {
      data: [],
      loading: false
    },
    history: {
      to: '',
      from: ''
    },
    packageVersion: process.env.PACKAGE_VERSION || '0',
    cupon: null,
    ticketChange: null
  },

  actions: {
    SET_SESSION_DIALOG({ commit }, payload) {
      if (payload.type === 'dialogType')
        commit('SET_SESSION_DIALOG_TYPE', { dialogType: payload.dialogType })
      if (payload.type === 'open')
        commit('SET_SESSION_DIALOG_OPEN', { open: payload.open })
    },
    LOAD_CITIES_LIST({ commit }) {
      APICities.getCities()
        .then(response => {
          if (response.data) {
            commit('SET_CITIES_LIST', { list: response.data })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    LOAD_CITIES_TO_LIST({ commit }, searchOrigin) {
      const { searchingCity } = searchOrigin
      APICities.getCityByCode(searchingCity)
        .then(response => {
          if (response.data) {
            commit('SET_CITIES_TO_LIST', { list: response.data })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    LOAD_CITIES_CONFIRMATION_LIST({ commit }, payload) {
      const { searchingCity } = payload
      APIConfirmation.getCities(searchingCity)
        .then(response => {
          if (response.data) {
            commit('SET_CITIES_CONFIRMATION_LIST', { list: response.data })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    LOAD_CITIES_TO_CONFIRMATION_LIST({ commit }, payload) {
      const { searchingCity } = payload
      APIConfirmation.getCitiesTo(searchingCity)
        .then(response => {
          if (response.data) {
            commit('SET_CITIES_TO_CONFIRMATION_LIST', { list: response.data })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    LOAD_SERVICES_LIST({ commit, dispatch, state }, payload) {
      const { fromDate, toDate, fromCity, toCity } = payload
      if (fromDate == null || fromDate === '') {
        Vue.notify({
          group: 'error',
          title: this.$tc('services'),
          type: 'error',
          text: this.$tc('no_going_date')
        })
        Vue.notify({ group: 'stuck-load', clean: true })
        dispatch('SET_LOADING_SERVICE', { loading: false })
        return
      }
      const requestGoing = APIService.get({
        origen: fromCity.codigo,
        destino: toCity.codigo,
        fecha: fromDate.replace(/-/g, ''),
        hora: '0000',
        idSistema: 7
      })
      let requestReturn
      if (toDate != null) {
        requestReturn = APIService.get({
          origen: toCity.codigo,
          destino: fromCity.codigo,
          fecha: toDate.replace(/-/g, ''),
          hora: '0000',
          idSistema: 7
        })
      }
      dispatch('SET_LOADING_SERVICE', { loading: true })
      Promise.all([requestGoing, requestReturn])
        .then(responses => {
          //console.log('responses', responses)
          const data = responses[0].data.map(item => {
            return { ...item, vuelta: false }
          })
          let dataReturn = []
          //console.log('first', data)
          if (responses[1]) {
            dataReturn = responses[1].data.map(item => {
              return { ...item, vuelta: true }
            })
            //console.log('second', dataReturn)
          }
          const resultData = data.concat(dataReturn)
          if (resultData.length <= 0) {
            Vue.notify({
              group: 'error',
              title: this.$i18n.t('services'),
              type: 'error',
              text: this.$i18n.t('no_av_services')
            })
            commit('SET_SERVICES_LIST', { list: [] })
            dispatch('SET_USER_FILTER', { filter: [], type: 'class' })
            return
          }
          //console.log('route', router.currentRoute)
          if (payload.goTo) {
            router.push('/services')
          } else if (router.currentRoute.name === 'ServicesPaymentData') {
            router.go(-1)
          }
          if (resultData) {
            commit('SET_SERVICES_LIST', { list: resultData })
            const classes = []
            resultData.forEach(item => {
              const firstService = item.servicioPrimerPiso
              const secondService = item.servicioSegundoPiso
              if (classes.length < 1) {
                classes.push(firstService)
                if (firstService !== secondService && secondService != null) {
                  classes.push(secondService)
                }
              } else {
                if (classes.filter(clas => clas === firstService).length < 1) {
                  classes.push(firstService)
                }
                if (
                  secondService != null &&
                  classes.filter(clas => clas === secondService).length < 1
                ) {
                  classes.push(secondService)
                }
              }
            })
            classes.push('Todos')
            dispatch('SET_USER_FILTER', { filter: classes, type: 'class' })
            dispatch('SET_USER_FILTER', {
              filter: 'Todos',
              type: 'selectedClass'
            })
          }
        })
        .catch(err => console.log(err))
        .finally(() => {
          dispatch('SET_SERVICE_BANNERS')
          dispatch('SET_FLOOR_BANNERS')
          dispatch('SET_PAYMENT_BANNERS')
          Vue.notify({ group: 'stuck-load', clean: true })
          dispatch('SET_LOADING_SERVICE', { loading: false })
        })
    },
    LOAD_CONFIRMATION_SERVICES_LIST({ commit, dispatch, state }, payload) {
      let errorMessage = null
      if (payload.date == null || payload.date === '') {
        errorMessage = this.$tc('no_going_date')
      }
      if (errorMessage !== null) {
        Vue.notify({
          group: 'error',
          title: this.$tc('services'),
          type: 'error',
          text: errorMessage
        })
        Vue.notify({ group: 'stuck-load', clean: true })
        return
      }
      dispatch('SET_LOADING_CONFIRMATION_SERVICE', { loading: true })
      APIService.get({
        origen: state.searchingConfirmation.ticket.ciudadOrigen,
        destino: state.searchingConfirmation.ticket.ciudadDestino,
        fecha: payload.date.replace(/-/g, ''),
        hora: '0000',
        idSistema: 7
      })
        .then(response => {
          const resultData = response.data.map(item => {
            return { ...item, fechaSubida: payload.date }
          })
          //console.log('resultData', resultData)
          if (resultData.length <= 0) {
            Vue.notify({
              group: 'error',
              title: this.$i18n.t('services'),
              type: 'error',
              text: this.$i18n.t('no_av_services')
            })
            commit('SET_CONFIRMATION_SERVICES_LIST', { list: [] })
            return
          }
          if (resultData) {
            commit('SET_CONFIRMATION_SERVICES_LIST', { list: resultData })
          }
          router.push({ name: 'ServicesList' })
        })
        .catch(err => console.log(err))
        .finally(() => {
          Vue.notify({ group: 'stuck-load', clean: true })
          dispatch('SET_LOADING_CONFIRMATION_SERVICE', { loading: false })
        })
    },

    LOAD_CUPONERA_LIST({ commit }) {
      APICities.getCuponera()
        .then(response => {
          if (response.data) {
            commit('SET_CUPONERA_LIST', { list: response.data })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    LOAD_CUPONERA_TO_LIST({ commit }, searchOrigin) {
      console.log('ACTIONS', searchOrigin)
      const { searchingCity } = searchOrigin
      APICities.getCuponeraByCode(searchingCity)
        .then(response => {
          if (response.data) {
            commit('SET_CUPONERA_TO_LIST', { list: response.data })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    SET_LOADING_SERVICE({ commit }, payload) {
      commit('SET_LOADING_SERVICE', { loading: payload.loading })
    },
    SET_LOADING_CONFIRMATION_SERVICE({ commit }, payload) {
      commit('SET_LOADING_CONFIRMATION_SERVICE', { loading: payload.loading })
    },
    SELECTED_SERVICE({ commit }, payload) {
      commit('SELECT_SERVICE', { selected: payload.selected })
    },
    SET_SERVICE_TAB({ commit }, payload) {
      commit('SET_SERVICE_TAB', { tab: payload.tab })
    },
    SET_CAN_DOWNLOAD({ commit }, payload) {
      if (payload.type === 'permission') {
        commit('SET_CAN_DOWNLOAD_PERMISSION', {
          permission: payload.permission
        })
      } else {
        commit('SET_CAN_DOWNLOAD_CODE', { code: payload.code })
      }
    },
    SET_NEW_USER_SEARCHING_CITY({ commit }, payload) {
      if (payload.direction === 'from') {
        commit('SET_USER_SEARCHING_FROM_CITY', { city: payload.city })
      } else {
        commit('SET_USER_SEARCHING_TO_CITY', { city: payload.city })
      }
    },

    SET_NEW_USER_SEARCHING_DATE({ commit }, payload) {
      if (payload.direction === 'from') {
        commit('SET_USER_SEARCHING_FROM_DATE', { date: payload.date })
      } else {
        commit('SET_USER_SEARCHING_TO_DATE', { date: payload.date })
      }
    },

    SET_NEW_USER_SEARCHING_PET({ commit }, payload) {
      commit('SET_USER_SEARCHING_PET', { petService: payload.petService })
    },

    SET_SEARCHING_CONFIRMATION({ commit }, payload) {
      if (payload.type === 'date') {
        commit('SET_SEARCHING_CONFIRMATION_DATE', { date: payload.date })
      } else {
        commit('SET_SEARCHING_CONFIRMATION_TICKET', { ticket: payload.ticket })
      }
    },

    SET_USER_FILTER({ commit }, payload) {
      if (payload.type === 'class') commit('SET_CLASS_FILTER', { filter: payload.filter })
      if (payload.type === 'selectedClass')
        commit('SET_SELECTED_CLASS_FILTER', { filter: payload.filter })
      if (payload.type === 'prices')
        commit('SET_PRICE_FILTER', { filter: payload.filter })
      if (payload.type === 'hours') commit('SET_HOUR_FILTER', { filter: payload.filter })
      if (payload.type === 'pet') {
        commit('SET_PET_FILTER', { filter: payload.filter })
      }
    },

    SET_USER_LANGUAGE({ commit }, payload) {
      commit('SET_LANGUAGE', { language: payload.language })
    },
    SET_STEP({ commit }, payload) {
      commit('SET_STEP', { step: payload.step })
    },

    SELECT({ commit }, payload) {
      commit('SELECT_SERVICE', { selected: payload.selected })
    },
    SHOW_RESUME: ({ commit }, payload) => {
      commit('SHOW_RESUME', { showResume: payload.showResume })
    },
    SET_GRID({ commit }, payload) {
      commit('SET_GRID', { grid: payload.grid })
    },
    SET_SEAT({ commit, getters }, payload) {
      if (getters.seatsByTravel(payload.seat.vuelta).length < 4) {
        commit('SET_SEAT', { seat: payload.seat })
      }
    },
    SET_CONFIRMATION_SEAT({ commit, getters }, payload) {
      if (getters.confirmationSeats.length < 1) {
        commit('SET_CONFIRMATION_SEAT', { seat: payload.seat })
      }
    },
    SET_CONFIRMATION_SEAT_AMOUNT({ commit }, payload) {
      commit('SET_CONFIRMATION_SEAT_AMOUNT', {
        seat: payload.seat,
        tomado: payload.tomado
      })
    },
    DELETE_SEAT({ commit }, payload) {
      commit('DELETE_SEAT', { seat: payload.seat })
    },
    DELETE_CONFIRMATION_SEAT({ commit }, payload) {
      commit('DELETE_CONFIRMATION_SEAT', { seat: payload.seat })
    },

    DELETE_ALL_SEAT: ({ commit }) => {
      commit('DELETE_ALL_SEAT', {})
    },
    DELETE_ALL_CONFIRMATION_SEAT: ({ commit }) => {
      commit('DELETE_ALL_CONFIRMATION_SEAT', {})
    },
    SET_TICKET_CONFIRMATION: ({ commit }, payload) => {
      commit('SET_TICKET_CONFIRMATION', { confirmation: payload.confirmation })
    },
    SET_PAYMENT_INFO({ commit }, payload) {
      commit('SET_PAYMENT_INFO', { payment_info: payload.payment_info })
    },

    SET_USER({ commit }, payload) {
      commit('SET_USER', { userData: payload.userData })
    },
    
    SET_USER_COUPON({ commit }, payload) {
      commit('SET_USER_COUPON', { userCoupon: payload.userCoupon })
    },
    DELETE_USER({ commit }) {
      commit('DELETE_USER')
    },
    SET_HOME_BANNERS({ commit, dispatch }, payload) {
      createBanners(payload, 1, commit, dispatch)
    },
    SET_HOME_BANNERS_LOADING({ commit }, payload) {
      commit('SET_HOME_BANNERS_LOADING', { loading: payload.loading })
    },
    SET_SERVICE_BANNERS({ commit, state }) {
      createBanners(state.searching, 2, commit)
    },
    SET_FLOOR_BANNERS({ commit, state }) {
      createBanners(state.searching, 3, commit)
    },
    SET_PAYMENT_BANNERS({ commit, state }) {
      createBanners(state.searching, 4, commit)
    },
    SET_HISTORY({ commit }, payload) {
      commit('SET_HISTORY', { from: payload.from, to: payload.to })
    },
    SET_COUPON_BUY({ commit }, cupon) {
      commit('SET_CUPON', cupon)
    },
    SET_TICKET_CHANGE({ commit }, tiket) {
      commit('SET_TICKET_CHANGE_VOUCHER', tiket)
    }
  },

  mutations: {
    SET_SESSION_DIALOG_TYPE: (state, { dialogType }) => {
      state.sessionDialog.dialogType = dialogType
    },
    SET_SESSION_DIALOG_OPEN: (state, { open }) => {
      state.sessionDialog.open = open
    },
    SET_CITIES_LIST: (state, { list }) => {
      state.cities = list
    },
    SET_CITIES_TO_LIST: (state, { list }) => {
      state.citiesTo = list
    },
    SET_CITIES_CONFIRMATION_LIST: (state, { list }) => {
      state.citiesConfirmation = list
    },
    SET_CITIES_TO_CONFIRMATION_LIST: (state, { list }) => {
      state.citiesToConfirmation = list
    },
    SET_SERVICES_LIST: (state, { list }) => {
      state.services.data = list
    },
    SET_CONFIRMATION_SERVICES_LIST: (state, { list }) => {
      state.confirmationServices.data = list
    },
    SET_LOADING_SERVICE: (state, { loading }) => {
      state.services.loading = loading
    },
    SET_LOADING_CONFIRMATION_SERVICE: (state, { loading }) => {
      state.confirmationServices.loading = loading
    },
    SET_USER_SEARCHING_FROM_CITY: (state, { city }) => {
      state.searching.from_city = city
    },
    SET_USER_SEARCHING_TO_CITY: (state, { city }) => {
      state.searching.to_city = city
    },
    SET_USER_SEARCHING_PET: (state, { petService }) => {
      console.log('Change set pet', petService)
      state.searching.petService = petService
    },
    SET_USER_SEARCHING_FROM_DATE: (state, { date }) => {
      const diff = moment(state.searching.to_date).diff(date, 'days')
      if (diff <= -1 || date == null) {
        state.searching.to_date = null
      }
      state.searching.from_date = date
    },
    SET_SEARCHING_CONFIRMATION_DATE: (state, { date }) => {
      state.searchingConfirmation.date = date
    },
    SET_SEARCHING_CONFIRMATION_TICKET: (state, { ticket }) => {
      state.searchingConfirmation.ticket = ticket
    },
    SET_USER_SEARCHING_TO_DATE: (state, { date }) => {
      state.searching.to_date = date
    },
    SET_CLASS_FILTER: (state, { filter }) => {
      state.serviceFilters.class = filter
    },
    SET_SELECTED_CLASS_FILTER: (state, { filter }) => {
      state.serviceFilters.selectedClass = filter
    },
    // SET_COMPANIE_FILTER: (state, {filter}) => {
    //   state.serviceFilters.companies = filter
    // },
    // SET_SELECTED_COMPANY_FILTER: (state, {filter}) => {
    //   state.serviceFilters.selectedCompany = filter
    // },
    SET_PRICE_FILTER: (state, { filter }) => {
      state.serviceFilters.prices = filter
    },
    SET_HOUR_FILTER: (state, { filter }) => {
      state.serviceFilters.hours = filter
    },
    SET_PET_FILTER: (state, { filter }) => {
      state.searching.petService = filter
    },
    SET_LANGUAGE: (state, { language }) => {
      state.language = language
    },
    SET_STEP: (state, { step }) => {
      state.step = step
    },
    SELECT_SERVICE: (state, { selected }) => {
      state.services.selected = selected
    },
    SET_SERVICE_TAB: (state, { tab }) => {
      state.services.tab = tab
    },
    SHOW_RESUME: (state, { showResume }) => {
      state.services.showResume = showResume
    },
    SET_GRID: (state, { grid }) => {
      state.grid = grid
    },
    SET_SEAT: (state, { seat }) => {
      seat.pasajero = {
        validForm: false,
        tipoDocumento: 'R',
        documento: '',
        comuna: '',
        direccion: '',
        email: '',
        materno: '',
        nacionalidad: '',
        nombres: '',
        paterno: '',
        telefono: '',
        telefonoEmergencia: '',
        terms: false,
        dialog: false
      }
      state.seats.push(seat)
    },
    SET_CONFIRMATION_SEAT_AMOUNT: (state, { seat, tomado }) => {
      state.seats[seat].tomadoPromo = tomado
    },
    SET_CONFIRMATION_SEAT: (state, { seat }) => {
      state.confirmationSeats.push(seat)
    },
    DELETE_CONFIRMATION_SEAT: (state, { seat }) => {
      state.confirmationSeats.splice(seat, 1)
    },
    DELETE_SEAT: (state, { seat }) => {
      state.seats.splice(seat, 1)
    },
    DELETE_ALL_SEAT: state => {
      state.seats = []
    },
    DELETE_ALL_CONFIRMATION_SEAT: state => {
      state.confirmationSeats = []
    },
    SET_TICKET_CONFIRMATION: (state, { confirmation }) => {
      state.searchingConfirmation.ticket.confirmation = confirmation
    },
    SET_PAYMENT_INFO(state, { payment_info }) {
      state.payment_info = payment_info
    },
    SET_USER(state, { userData }) {
      state.userData = userData
    },
    SET_USER_COUPON(state, { userCoupon }) {
      state.userCoupon = userCoupon
    },
    DELETE_USER(state) {
      const userData = {
        cambiaClave: false,
        payment_info: {},
        token: '',
        urlInicial: null,
        usuario: {},
        active: false
      }
      state.userData = userData
    },
    DELETE_USER_COUPON(state) {
      const userCoupon = {
        documento: '',
        email: '',
        nacionalidad: '',
        nombre: '',
        apellido: '',
        direccion: '',
        active: false
      }
      state.userCoupon = userCoupon
    },
    SET_HOME_BANNERS(state, { banners }) {
      state.homeBanners.data = banners
    },
    SET_HOME_BANNERS_LOADING(state, { loading }) {
      state.homeBanners.loading = loading
    },
    SET_SERVICE_BANNERS(state, { banners }) {
      state.services.banners = banners
    },
    SET_FLOOR_BANNERS(state, { banners }) {
      state.services.floorBanners = banners
    },
    SET_PAYMENT_BANNERS(state, { banners }) {
      state.services.paymentBanners = banners
    },
    SET_HISTORY(state, history) {
      state.history = history
    },
    SET_CUPON(state, cupon) {
      state.cupon = cupon
    },
    SET_TICKET_CHANGE_VOUCHER(state, ticket) {
      state.ticketChange = ticket
    },
    SET_CUPONERA_LIST: (state, { list }) => {
      state.cuponera = list
    },
    SET_CUPONERA_TO_LIST: (state, { list }) => {
      state.cuponeraTo = list
    }
  },

  getters: {
    getLanguage: state => {
      return state.language
    },
    getCitiesList: state => {
      return state.cities.filter(cities => !cities.completed)
    },
    getCitiesToList: state => {
      return state.citiesTo.filter(citiesTo => !citiesTo.completed)
    },
    getCitiesConfirmacionList: state => {
      return state.citiesConfirmation.filter(
        citiesConfirmation => !citiesConfirmation.completed
      )
    },
    getCitiesToConfirmacionList: state => {
      return state.citiesToConfirmation.filter(
        citiesToConfirmation => !citiesToConfirmation.completed
      )
    },
    getServiceFiltered: state => {
      const serviceFilters = state.serviceFilters
      const servicesByCompany = state.services.data.filter(service => {
        let filter = true
        // if (serviceFilters.selectedCompany !== 'Todos') {
        //   filter = service.empresa === serviceFilters.selectedCompany
        // }
        const timeSplited = service.horaSalida.split(':')
        const hours = parseInt(timeSplited[0] * 60)
        const minutes = parseInt(timeSplited[1])
        const timeToCompare = hours + minutes
        filter =
          timeToCompare >= serviceFilters.hours.min &&
          timeToCompare <= serviceFilters.hours.max &&
          filter
        return filter
      })
      const servicesByPrice = servicesByCompany.map(service => {
        const tarifa1 = parseInt(service.tarifaPrimerPisoInternet.split('.').join(''))
        let filter1 =
          tarifa1 >= serviceFilters.prices.min && tarifa1 <= serviceFilters.prices.max
        if (serviceFilters.selectedClass !== 'Todos') {
          filter1 = service.servicioPrimerPiso === serviceFilters.selectedClass && filter1
        }
        let newItem = { ...service, filter1 }
        if (service.busPiso2 != null) {
          const tarifa2 = parseInt(service.tarifaSegundoPisoInternet.split('.').join(''))
          let filter2 =
            tarifa2 >= serviceFilters.prices.min && tarifa2 <= serviceFilters.prices.max
          if (serviceFilters.selectedClass !== 'Todos') {
            filter2 =
              service.servicioSegundoPiso === serviceFilters.selectedClass && filter2
          }
          newItem = { ...newItem, filter2 }
        }
        return newItem
      })
      return servicesByPrice
    },
    getConfirmationServiceFiltered: state => {
      //const { clase } = state.searchingConfirmation.ticket
      const { claseFiltro } = state.searchingConfirmation.ticket
      //console.log(claseFiltro)
      const servicesFiltered = state.confirmationServices.data.map(service => {
        let filter1 =
          claseFiltro.find(
            item => service.idClaseBusPisoUno.substr(0, 3) === item.substr(0, 3)
          ) != undefined
        let newItem = { ...service, filter1 }
        if (service.busPiso2 != null) {
          let filter2 =
            claseFiltro.find(
              item => service.idClaseBusPisoDos.substr(0, 3) === item.substr(0, 3)
            ) != undefined
          newItem = { ...newItem, filter2 }
        }
        return newItem
      })
      return servicesFiltered
    },
    getServiceList: (state, getters) => vuelta => {
      let servicesTemp = []
      let services = []
      getters.getServiceFiltered.forEach(item => {
        // Detecta si el pasaje es ida o vuelta
        if (vuelta) {
          if (!item.vuelta) {
            return
          }
        } else {
          if (item.vuelta) {
            return
          }
        }
        const pisos = []
        if (services.length >= 1) {
          return
        }
        const pisoUno = {}
        const pisoDos = {}
        if (item.filter1) {
          pisoUno.piso = 0
          pisoUno.pisoText = '01'
          pisoUno.servicio = item.servicioPrimerPiso
          pisoUno.tarifa = item.tarifaPrimerPiso
          pisoUno.tarifaInternet = item.tarifaPrimerPisoInternet
          pisoUno.clase = item.idClaseBusPisoUno
          pisoUno.busPiso = item.busPiso1
          pisoUno.busOtroPiso = item.busPiso2
          pisoUno.fechaSalida = item.fechaSalida
          pisoUno.horaSalida = item.horaSalida
          pisoUno.terminalSalida = item.terminalSalida
          pisoUno.horaLlegada = item.horaLlegada
          pisoUno.fechaLlegada = item.fechaLlegada
          pisoUno.terminaLlegada = item.terminaLlegada
          pisoUno.confirmation = item.idaVueltaPisoUno || { idaVuelta: false }
          pisos.push(pisoUno)
        }
        if (item.filter2) {
          pisoDos.piso = 1
          pisoDos.pisoText = '02'
          pisoDos.servicio = item.servicioSegundoPiso
          pisoDos.tarifa = item.tarifaSegundoPiso
          pisoDos.tarifaInternet = item.tarifaSegundoPisoInternet
          pisoDos.clase = item.idClaseBusPisoDos
          pisoDos.busPiso = item.busPiso2
          pisoDos.busOtroPiso = pisoUno.busPiso
          pisoDos.fechaSalida = item.fechaSalida
          pisoDos.horaSalida = item.horaSalida
          pisoDos.terminalSalida = item.terminalSalida
          pisoDos.horaLlegada = item.horaLlegada
          pisoDos.fechaLlegada = item.fechaLlegada
          pisoDos.terminaLlegada = item.terminaLlegada
          pisoDos.confirmation = item.idaVueltaPisoDos || { idaVuelta: false }
          pisos.push(pisoDos)
        }
        if (pisos.length > 0) {
          const id =
            item.idServicio +
            item.fechaSalida +
            item.idTerminalOrigen +
            item.idTerminalDestino
          servicesTemp.push({ ...Object.assign({}, item), id, pisos })
        }
      })
      return servicesTemp
    },
    getConfirmationServiceList: (state, getters) => {
      let servicesTemp = []
      getters.getConfirmationServiceFiltered.forEach(item => {
        const pisos = []
        const pisoUno = {}
        const pisoDos = {}
        if (item.filter1) {
          pisoUno.piso = 0
          pisoUno.pisoText = '01'
          pisoUno.servicio = item.servicioPrimerPiso
          pisoUno.tarifa = item.tarifaPrimerPiso
          pisoUno.tarifaInternet = item.tarifaPrimerPisoInternet
          pisoUno.clase = item.idClaseBusPisoUno
          pisoUno.busPiso = item.busPiso1
          pisoUno.busOtroPiso = item.busPiso2
          pisoUno.fechaSalida = item.fechaSalida
          pisoUno.horaSalida = item.horaSalida
          pisoUno.terminalSalida = item.terminalSalida
          pisoUno.horaLlegada = item.horaLlegada
          pisoUno.fechaLlegada = item.fechaLlegada
          pisoUno.terminaLlegada = item.terminaLlegada
          pisoUno.confirmation = item.idaVueltaPisoUno || { idaVuelta: false }
          if (pisoUno.confirmation.idaVuelta) {
            pisoUno.confirmation.tomado = false
          }
          pisos.push(pisoUno)
        }
        if (item.filter2) {
          pisoDos.piso = 1
          pisoDos.pisoText = '02'
          pisoDos.servicio = item.servicioSegundoPiso
          pisoDos.tarifa = item.tarifaSegundoPiso
          pisoDos.tarifaInternet = item.tarifaSegundoPisoInternet
          pisoDos.clase = item.idClaseBusPisoDos
          pisoDos.busPiso = item.busPiso2
          pisoDos.busOtroPiso = pisoUno.busPiso
          pisoDos.fechaSalida = item.fechaSalida
          pisoDos.horaSalida = item.horaSalida
          pisoDos.terminalSalida = item.terminalSalida
          pisoDos.horaLlegada = item.horaLlegada
          pisoDos.fechaLlegada = item.fechaLlegada
          pisoDos.terminaLlegada = item.terminaLlegada
          pisoDos.confirmation = item.idaVueltaPisoDos || { idaVuelta: false }
          if (pisoDos.confirmation.idaVuelta) {
            pisoDos.confirmation.tomado = false
          }
          pisos.push(pisoDos)
        }
        if (pisos.length > 0) {
          const id =
            item.idServicio +
            item.fechaSalida +
            item.idTerminalOrigen +
            item.idTerminalDestino
          servicesTemp.push({ ...Object.assign({}, item), id, pisos })
        }
      })
      return servicesTemp
    },
    getSelectedService: state => {
      return state.services.selected
    },
    getSearching: state => {
      return state.searching
    },
    getLoadingService: state => {
      return state.services.loading
    },
    getConfirmationLoadingService: state => {
      return state.confirmationServices.loading
    },
    getServiceClassFilters: state => {
      return [...new Set(state.services.data.map(item => item.level_class))]
    },
    getUserClassFilter: state => {
      if (state.serviceFilters.class) {
        return state.serviceFilters.class
      }
      return []
    },
    getServiceBanners: state => {
      return state.services.banners
    },
    getServiceFloorBanners: state => {
      return state.services.floorBanners
    },
    getServicePaymentBanners: state => {
      return state.services.paymentBanners
    },
    // getUserCompanyFilter: state => {
    //   if (state.serviceFilters.companies) {
    //     const ids = state.serviceFilters.companies
    //     return companiesList.filter(company => {
    //       for (let id of ids) {
    //         if (company.id === id) {
    //           return true
    //         }
    //       }
    //       return false
    //     })
    //   }
    //   return []
    // },
    set_step: state => {
      return state.step
    },

    selected: state => {
      return state.selected
    },

    show_resume: state => {
      return state.services.showResume
    },

    grid: state => {
      return state.grid
    },

    seats: state => {
      return state.seats
    },
    seatsWithPromoNotSelected: (state, getters) => {
      return getters.seats.filter(item => item.hasPromo && !item.tomadoPromo)
    },
    seatsWithPromo: (state, getters) => {
      return getters.seats.filter(item => item.tomadoPromo)
    },
    confirmationSeats: state => {
      return state.confirmationSeats
    },
    getSearchingConfirmation: state => {
      return state.searchingConfirmation
    },
    seatsTotalAmount: (state, getters) => {
      let totalAmount = 0
      getters.seats.forEach(item => {
        const tarifa = item.tomadoPromo ? item.totalPromo : item.tarifa
        totalAmount += parseInt(tarifa.split('.').join('')) // totalAmount += 10
      })
      return totalAmount
    },
    confirmationSeatsTotalAmount: (state, getters) => {
      let totalAmount = 0
      getters.confirmationSeats.forEach(item => {
        totalAmount += parseInt(item.tarifa.split('.').join('')) // totalAmount += 10
      })
      return totalAmount
    },
    hasVuelta(state, getters) {
      const services = getters.getServiceList(true)
      return services.length > 0
    },
    getServicesTab(state) {
      return state.services.tab
    },
    seatsByTravel: state => vuelta => {
      return state.seats.filter(item => {
        return item.vuelta || false === vuelta
      })
    },
    payment_info: state => {
      if (state.userData.active) {
        return state.userData.payment_info
      }
      return state.payment_info
    },
    userData: state => {
      return state.userData
    },
    userCoupon: state => {
      return state.userCoupon
    },
    getHistory: state => {
      return state.history
    },
    appVersion: state => {
      return state.packageVersion
    },
    getCupon: state => {
      return state.cupon.cupon
    },
    getTicketChange: state => {
      return state.ticketChange.ticketChange
    },
    getCuponeraList: state => {
      return state.cuponera.filter(cuponera => !cuponera.completed)
    },
    getCuponeraToList: state => {
      return state.cuponeraTo.filter(cuponeraTo => !cuponeraTo.completed)
    }
  }
})

export function addStoreProperty(name, property) {
  store[name] = property
}

export default store
