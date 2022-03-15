import { createStore } from 'vuex'

// store state of application, methods to get data and change data in a single place
export default createStore({
  state: {
    counter: 0,
    colorCode: 'black',
  },
  // used to access state with a little clone and modification (can also access directly to state)
  getters: {
    squareNumber(state) {
      return state.counter * state.counter;
    }
  },
  // cannot write asynchronous code in mutations
  mutations: {
    increaseCounter(state, randomNumber) {
      state.counter += randomNumber;
    },
    decreaseCounter(state, randomNumber) {
      state.counter -= randomNumber;
    },
    setColorCode(state, colorCode) {
      state.colorCode = colorCode;
    },
  },
  // can write asynchronous code in actions
  actions: {
    async increaseCounter({ commit }) {
      const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new');
      const data = parseInt(await res.text());
      commit('increaseCounter', data);
    },
    async decreaseCounter({ commit }) {
      const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new');
      const data = parseInt(await res.text());
      commit('decreaseCounter', data);
    },
    setColorCode({ commit }, colorCode) {
      commit('setColorCode', colorCode);
    },
  },
  // break big store into multiple smaller stores
  modules: {
  }
});

// actions -> commit mutations -> change state
