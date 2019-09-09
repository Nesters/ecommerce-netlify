import axios from "axios"
import uuidv1 from "uuid/v1"
import * as Cookies from 'js-cookie'
import data from "~/static/shopifydata.json"

export const state = () => ({
  cartUIStatus: "idle",
  collections: data.collections,
  storedata: data.products,
  cart: [],
  checkout: null
})

export const getters = {
  featuredProducts: state => state.storedata.slice(0, 3),
  cartCount: state => {
    if (!state.checkout) return 0
    return state.checkout.lineItems.reduce((ac, next) => ac + next.quantity, 0)
  },
  cartTotal: state => {
    if (!state.checkout) return 0
    return state.checkout.lineItems.reduce((ac, next) => ac + next.quantity * parseFloat(next.variant.price), 0)
  }
}

export const mutations = {
  setCheckout: (state, payload) => {
    state.checkout = { ...payload }
    Cookies.set('checkoutId', state.checkout.id, { expires: 1 })
  },
  setClient: (state, payload) => {
    state.client = { ...payload.client }
  },
  updateCartUI: (state, payload) => {
    state.cartUIStatus = payload
  },
  clearCart: state => {
    //this clears the cart
    ;(state.cart = []), (state.cartUIStatus = "idle")
  },
}

export const actions = {
  async initializeCheckout({ state, commit }, payload) {
    commit('setClient', payload)
    const checkoutId = Cookies.get('checkoutId')
    try {
      const checkout = !checkoutId
        ? await state.client.checkout.create() : await state.client.checkout.fetch(checkoutId)
      commit('setCheckout', checkout);
    } catch (err) {
      console.log(err)
    }
  },
  async addToCart({ state, commit}, payload) {
    try {
      const checkout = await state.client.checkout.addLineItems(
        state.checkout.id,
        [payload]
      )
      commit('setCheckout', checkout)
    } catch (err) {
      console.log(err)
    }
  },
  async removeFromCart({ state, commit }, payload) {
    try {
      const checkout = await state.client.checkout.removeLineItems(
        state.checkout.id,
        [payload]
      )
      commit('setCheckout', checkout)
    } catch (err) {
      console.log(err)
    }
  }
}
