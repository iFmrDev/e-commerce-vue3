import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      isLogin: sessionStorage.isLogin != undefined? JSON.parse(sessionStorage.isLogin): false,
      cartCount: sessionStorage.cartItems != undefined? JSON.parse(sessionStorage.cartItems).length: 0,
    }
  },
  mutations: {
    loginStatus(state, isLogin){
      state.isLogin = isLogin
      sessionStorage.setItem('isLogin', JSON.stringify(isLogin));
    },

    updateCartCount(state, val){
        state.cartCount += val 
    },

  }
})

export default store

