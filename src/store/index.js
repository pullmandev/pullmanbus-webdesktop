/* eslint-disable */ 
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import APIService from '@/services/api/services'
import APICities from '@/services/api/cities'
import router from '../router'
import moment from 'moment'
// import companiesList from '../../companies.json'

Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [createPersistedState({
    paths: ['language', 'searching', 'cities', 'seats', 'step', 'payment_info', 'userData']
  })],
  state: {
    language: 'es',
    sessionDialog: {
      dialogType: '',
      open: false
    },
    cities: [],
    searching: {
      from_city: null,
      to_city: null,
      from_date: null,
      to_date: null
    },
    services: {
      data: [],
      loading: false,
      selected: false,
      showResume: false,
      tab: 'Ida'
    },
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
    step:1,
    payment_info: {
      name: '',
      rut: '',
      email: '',
      movil: '',
      completeName: ''
    },
    userData: {
      cambiaClave: false,
      payment_info: {},
      token: '',
      urlInicial: null,
      usuario: {},
      active: false
    }
  },

  actions: {
    SET_SESSION_DIALOG ({commit}, payload) {
      if (payload.type === 'dialogType') commit('SET_SESSION_DIALOG_TYPE', {dialogType: payload.dialogType})
      if (payload.type === 'open') commit('SET_SESSION_DIALOG_OPEN', {open: payload.open})
    },
    LOAD_CITIES_LIST ({commit}) {
      APICities.getCities().then((response) => {
        if (response.data) {
          commit('SET_CITIES_LIST', {list: response.data})
        }
      }).catch(err => {
        console.log(err)
      })
    },

    LOAD_SERVICES_LIST ({commit, dispatch, state}) {
      if (state.searching.from_date == null || state.searching.from_date === '') {
        Vue.notify({
          group: 'error',
          title: this.$translate('services'),
          type: 'error',
          text: this.$translate('no_going_date')
        })
        Vue.notify({ group: 'stuck-load', clean: true })
        dispatch('SET_LOADING_SERVICE', {loading: false})
        return
      }
      const requestGoing = APIService.get({
        origen: state.searching.from_city.codigo,
        destino: state.searching.to_city.codigo,
        fecha: state.searching.from_date.replace(/-/g, ''),
        hora: '0000',
        idSistema: 7
      })
      let requestReturn
      if (state.searching.to_date != null) {
        requestReturn = APIService.get({
          origen: state.searching.to_city.codigo,
          destino: state.searching.from_city.codigo,
          fecha: state.searching.to_date.replace(/-/g, ''),
          hora: '0000',
          idSistema: 7
        }) 
      }
      dispatch('SET_LOADING_SERVICE', {loading: true})
      Promise.all([requestGoing, requestReturn])
      .then(responses => {
        console.log('responses', responses)
        const data = responses[0].data
          .map(item => {
            item.vuelta = false
            return item
          })
        let dataReturn = []
        console.log('first', data)
        if (responses[1]) {
          dataReturn = responses[1].data
            .map(item => {
              item.vuelta = true
              return item
            })
          console.log('second', dataReturn)
        }
        const resultData = data.concat(dataReturn)
        if (resultData.length <= 0) {
          Vue.notify({
            group: 'error',
            title: this.$translate('services'),
            type: 'error',
            text: this.$translate('no_av_services')
          })
          commit('SET_SERVICES_LIST', {list: []})
          // dispatch('SET_USER_FILTER', {filter: [], type: 'companies'})
          dispatch('SET_USER_FILTER', {filter: [], type: 'class'})
          return
        }
        router.push('/services')
        if (resultData) {
          commit('SET_SERVICES_LIST', {list: resultData})
          // const companies = []
          const classes = []
          resultData.forEach(item => {
            // if (companies.length < 1) {
            //   companies.push(item.empresa)
            // } else if (companies.filter(company => company === item.empresa).length < 1) {
            //   companies.push(item.empresa)
            // }
            const firstService = item.servicioPrimerPiso
            const secondService = item.servicioSegundoPiso
            if (classes.length < 1) {
              classes.push(firstService)
              if (firstService !== secondService && secondService !== null) {
                classes.push(secondService)
              }
            } else {
              if (classes.filter(clas => clas === firstService).length < 1) {
                classes.push(firstService)
              }
              if (secondService !== null && classes.filter(clas => clas === secondService).length < 1) {
                classes.push(secondService)
              }
            }
          })
          // companies.push('Todos')
          // dispatch('SET_USER_FILTER', {filter: companies, type: 'companies'})
          // dispatch('SET_USER_FILTER', {filter: 'Todos', type: 'selectedCompany'})
          classes.push('Todos')
          dispatch('SET_USER_FILTER', {filter: classes, type: 'class'})
          dispatch('SET_USER_FILTER', {filter: 'Todos', type: 'selectedClass'})
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        Vue.notify({ group: 'stuck-load', clean: true })
        dispatch('SET_LOADING_SERVICE', {loading: false})
      })
    },
    SET_LOADING_SERVICE ({commit}, payload) {
      commit('SET_LOADING_SERVICE', {loading: payload.loading})
    },
    SELECTED_SERVICE ({commit}, payload) {
      commit('SELECT_SERVICE', {selected: payload.selected})
    },
    SET_SERVICE_TAB ({commit}, payload) {
      commit('SET_SERVICE_TAB', {tab: payload.tab})
    },
    SET_NEW_USER_SEARCHING_CITY ({commit}, payload) {
      if (payload.direction === 'from') {
        commit('SET_USER_SEARCHING_FROM_CITY', {city: payload.city})
      } else {
        commit('SET_USER_SEARCHING_TO_CITY', {city: payload.city})
      }
    },

    SET_NEW_USER_SEARCHING_DATE ({commit}, payload) {
      if (payload.direction === 'from') {
        commit('SET_USER_SEARCHING_FROM_DATE', {date: payload.date})
      } else {
        commit('SET_USER_SEARCHING_TO_DATE', {date: payload.date})
      }
    },

    SET_USER_FILTER ({commit}, payload) {
      if (payload.type === 'class') commit('SET_CLASS_FILTER', {filter: payload.filter})
      if (payload.type === 'selectedClass') commit('SET_SELECTED_CLASS_FILTER', {filter: payload.filter})
      // if (payload.type === 'companies') commit('SET_COMPANIE_FILTER', {filter: payload.filter})
      // if (payload.type === 'selectedCompany') commit('SET_SELECTED_COMPANY_FILTER', {filter: payload.filter})
      if (payload.type === 'prices') commit('SET_PRICE_FILTER', {filter: payload.filter})
      if (payload.type === 'hours') commit('SET_HOUR_FILTER', {filter: payload.filter})
    },
    
    SET_USER_LANGUAGE ({commit}, payload) {
      commit('SET_LANGUAGE', {language: payload.language})
    },
    SET_STEP ({commit}, payload) {
      commit('SET_STEP', {step: payload.step})
    },

    SELECT ({commit}, payload) {
      commit('SELECT_SERVICE', {selected: payload.selected})
    },
    SHOW_RESUME: ({commit}, payload) => {
      commit('SHOW_RESUME', {showResume: payload.showResume})
    },
    SET_GRID ({commit}, payload) {
      commit('SET_GRID', {grid: payload.grid})
    },

    SET_SEAT ({commit, getters}, payload) {
      if (getters.seatsByTravel(payload.seat.vuelta).length < 4) {
        commit('SET_SEAT', {seat: payload.seat})
      }
    },

    DELETE_SEAT ({commit}, payload) {
      commit('DELETE_SEAT', {seat: payload.seat})
    },

    DELETE_ALL_SEAT: ({commit}) => {
      commit('DELETE_ALL_SEAT', {})
    },

    SET_PAYMENT_INFO ({commit}, payload) {
      commit('SET_PAYMENT_INFO', {payment_info: payload.payment_info})
    },
    
    SET_USER ({commit}, payload) {
      commit('SET_USER', {userData: payload.userData})
    },

    DELETE_USER ({commit}) {
      commit('DELETE_USER')
    }
  },
  mutations: {
    SET_SESSION_DIALOG_TYPE: (state, {dialogType}) => {
      state.sessionDialog.dialogType = dialogType
    },
    SET_SESSION_DIALOG_OPEN: (state, {open}) => {
      state.sessionDialog.open = open
    },
    SET_CITIES_LIST: (state, {list}) => {
      state.cities = list
    },
    SET_SERVICES_LIST: (state, {list}) => {
      state.services.data = list
    },
    SET_LOADING_SERVICE: (state, {loading}) => {
      state.services.loading = loading
    },
    SET_USER_SEARCHING_FROM_CITY: (state, {city}) => {
      state.searching.from_city = city
    },
    SET_USER_SEARCHING_TO_CITY: (state, {city}) => {
      state.searching.to_city = city
    },
    SET_USER_SEARCHING_FROM_DATE: (state, {date}) => {
      const diff = moment(state.searching.to_date).diff(state.searching.from_date)
      if (diff > -1) {
        state.searching.to_date = null
      }
      state.searching.from_date = date
    },
    SET_USER_SEARCHING_TO_DATE: (state, {date}) => {
      state.searching.to_date = date
    },
    SET_CLASS_FILTER: (state, {filter}) => {
      state.serviceFilters.class = filter
    },
    SET_SELECTED_CLASS_FILTER: (state, {filter}) => {
      state.serviceFilters.selectedClass = filter
    },
    // SET_COMPANIE_FILTER: (state, {filter}) => {
    //   state.serviceFilters.companies = filter
    // },
    // SET_SELECTED_COMPANY_FILTER: (state, {filter}) => {
    //   state.serviceFilters.selectedCompany = filter
    // },
    SET_PRICE_FILTER: (state, {filter}) => {
      state.serviceFilters.prices = filter
    },
    SET_HOUR_FILTER: (state, {filter}) => {
      state.serviceFilters.hours = filter
    },
    SET_LANGUAGE: (state, {language}) => {
      state.language = language
    },
    SET_STEP: (state, {step}) => {
      state.step = step
    },
    SELECT_SERVICE: (state, {selected}) => {
      state.services.selected = selected
    },
    SET_SERVICE_TAB: (state, {tab}) => {
      state.services.tab = tab
    },
    SHOW_RESUME: (state, {showResume}) => {
      state.services.showResume = showResume
    },
    SET_GRID: (state, {grid}) => {
      state.grid = grid
    },
    SET_SEAT: (state, {seat}) => {
      state.seats.push(seat)
    },
    DELETE_SEAT: (state, {seat}) => {
      state.seats.splice(seat, 1)
    },
    DELETE_ALL_SEAT: (state) => {
      state.seats = []
    },
    SET_PAYMENT_INFO (state, {payment_info}) {
      state.payment_info = payment_info
    },
    SET_USER (state, {userData}) {
      state.userData = userData
    },
    DELETE_USER (state) {
      const userData = {
        cambiaClave: false,
        payment_info: {},
        token: '',
        urlInicial: null,
        usuario: {},
        active: false
      }
      state.userData = userData
    }
  },


  getters: {
    getLanguage: state => {
      return state.language
    },
    getCitiesList: state => {
      return state.cities.filter(cities => !cities.completed)
    },
    getServiceFiltered: state => {
      const serviceFilters = state.serviceFilters
      const servicesByCompany = state.services.data.filter((service) => {
        let filter = true
        // if (serviceFilters.selectedCompany !== 'Todos') {
        //   filter = service.empresa === serviceFilters.selectedCompany
        // }
        const timeSplited = service.horaSalida.split(':')
        const hours = parseInt(timeSplited[0]*60)
        const minutes = parseInt(timeSplited[1])
        const timeToCompare = hours + minutes
        filter = (timeToCompare >= serviceFilters.hours.min && timeToCompare <= serviceFilters.hours.max) && filter
        return filter
      })
      const servicesByPrice = servicesByCompany.map((service) => {
        const tarifa1 = parseInt(service.tarifaPrimerPisoInternet.split('.').join(''))
        let filter1 = (tarifa1 >= serviceFilters.prices.min && tarifa1 <= serviceFilters.prices.max)
        if (serviceFilters.selectedClass !== 'Todos') {
          filter1 = service.servicioPrimerPiso === serviceFilters.selectedClass && filter1
        }
        let newItem = {...service, filter1}
        if (service.busPiso2 != null) {
          const tarifa2 = parseInt(service.tarifaSegundoPisoInternet.split('.').join(''))
          let filter2 = (tarifa2 >= serviceFilters.prices.min && tarifa2 <= serviceFilters.prices.max)
          if (serviceFilters.selectedClass !== 'Todos') {
            filter2 = service.servicioSegundoPiso === serviceFilters.selectedClass && filter2
          }
          newItem = {...newItem, filter2}
        }
        return newItem
      })
      return servicesByPrice
    },
    getServiceList: (state, getters) => (vuelta) =>{
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
          pisos.push(pisoDos)
        }
        if (pisos.length > 0) {
          servicesTemp.push({...Object.assign({}, item), pisos})
        }
      })
      // Obteniendo keys
      servicesTemp.forEach(item => {
        if (services.length < 1) {
          services.push({id: item.horaSalida + item.horaLlegada + item.terminaLlegada, data: []})
        } else {
          const elements = services.filter(service => service.id === item.horaSalida + item.horaLlegada + item.terminaLlegada)
          if (elements.length < 1) {
            services.push({id: item.horaSalida + item.horaLlegada + item.terminaLlegada, data: []})
          }
        }
      })
      // Obteniendo data
      services.map(item => {
        for (let service of servicesTemp) {
          if (item.id === service.horaSalida + service.horaLlegada + service.terminaLlegada) {
            item.data.push({id: service.idServicio + service.idTerminalOrigen, ...service})
          }
        }
        return item
      })
      console.log('services result', services)
      return services
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
    getServiceClassFilters: state => {
      return [...new Set(state.services.data.map(item => item.level_class))]
    },
    getUserClassFilter: state => {
      if (state.serviceFilters.class) {
        return state.serviceFilters.class
      }
      return []
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

    hasVuelta (state, getters) {
      const services = getters.getServiceList(true)
      return services.length > 0
    },

    seatsByTravel: state => (vuelta) => {
      return state.seats.filter(item => {
        return item.vuelta === vuelta
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
    }
  }
})
export function addStoreProperty (name, property) {
  store[name] = property
}
export default store
