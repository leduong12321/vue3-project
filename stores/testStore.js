import { defineStore } from 'pinia'

export const testStore = defineStore('test', {
  // a function that returns a fresh state
  state: () => ({
    counter: 0,
    name: 'Eduardo',
  }),
  // optional getters
  getters: {

    doubleCounter: (state) => state.counter * 2,

    doubleCounterPlusOne() {
      return this.doubleCounter + 1;
    },
  },
  // optional actions
  actions: {
    reset() {
      this.counter = 0
    },
  },
})