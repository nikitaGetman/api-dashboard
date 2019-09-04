import Vue from 'vue'
import Vuex from 'vuex'
import { apiCards } from './assets/apiCardsData.js'

Vue.use(Vuex)

function generateToken(n) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  var token = ''
  for (var i = 0; i < n; i++) {
    token += chars[Math.floor(Math.random() * chars.length)]
  }
  return token
}

export default new Vuex.Store({
  state: {
    user: null,
    customers: [],
    activeCustomerId: null,
    activeApiCardId: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('user')
      location.reload()
    },
    CREATE_CUSTOMER(state, credentials) {
      state.customers.push(credentials)
      sessionStorage.setItem('customersList', JSON.stringify(state.customers))
    },
    UPDATE_CUSTOMER(state, { id, credentials }) {
      for (let index in state.customers) {
        if (state.customers[index].id === id) {
          state.customers[index] = {
            id,
            ...credentials,
            cards: state.customers[index].cards
          }
        }
      }
      state.customers = [...state.customers]
      sessionStorage.setItem('customersList', JSON.stringify(state.customers))
    },
    SET_ACTIVE_CUSTOMER(state, id) {
      state.activeCustomerId = id
      sessionStorage.setItem('activeCustomerId', JSON.stringify(id))
    }
  },
  actions: {
    initializeStore({ state, commit }) {
      const userString = localStorage.getItem('user')
      const customersList = sessionStorage.getItem('customersList')
      const activeCustomerId = sessionStorage.getItem('activeCustomerId')

      if (userString) {
        commit('SET_USER_DATA', JSON.parse(userString))
      }
      if (customersList) {
        state.customers = JSON.parse(customersList)

        if (activeCustomerId) {
          commit('SET_ACTIVE_CUSTOMER', JSON.parse(activeCustomerId))
        }
      }
    },
    // eslint-disable-next-line no-unused-vars
    login({ commit }, credentials) {
      commit('SET_USER_DATA', { token: generateToken(16) })
      // mock of succesfull API/login request
      return new Promise(resolve => resolve())
    },
    logout({ commit }) {
      commit('CLEAR_USER_DATA')
    },
    createCustomer({ state, commit }, credentials) {
      const id = state.customers.length

      // generate random list of API cards for each created customer
      const min = 4
      const max = apiCards.length
      const cardsLength = Math.round(Math.random() * (max - min) + min)
      let cards = []
      let cardsListCopy = apiCards.slice()

      for (let index = 0; index < cardsLength; index++) {
        const randomCardIndex = Math.floor(Math.random() * cardsListCopy.length)
        cards.push(cardsListCopy[randomCardIndex])
        cardsListCopy.splice(randomCardIndex, 1)
      }

      commit('CREATE_CUSTOMER', { id, ...credentials, cards })
      commit('SET_ACTIVE_CUSTOMER', id)
      // mock of succesfull API/creeateCustomer request
      return new Promise(resolve => resolve())
    },
    updateCustomer({ state, commit }, credentials) {
      commit('UPDATE_CUSTOMER', { id: state.activeCustomerId, credentials })
      // mock of succesfull API/updateCustomer request
      return new Promise(resolve => resolve())
    },
    selectCustomer({ commit }, id) {
      commit('SET_ACTIVE_CUSTOMER', id)
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    },
    getCustomers(state) {
      return state.customers
    },
    getCustomerById: state => id => {
      return state.customers.find(customer => customer.id === id)
    },
    getActiveCustomer(state, getters) {
      return getters.getCustomerById(state.activeCustomerId)
    },
    getActiveCustomerCards(state, getters) {
      const customer = getters.getActiveCustomer
      return customer ? customer.cards : null
    }
  }
})
