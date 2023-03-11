import { defineStore } from 'pinia'

export const bookHeader = defineStore('test', {
  // a function that returns a fresh state
  state: () => ({
    field: []
  }),
  // optional getters
  getters: {
    getHeader() {
        return this.field;
    }
  },
  // optional actions
  actions: {
    setHeader(field) {
        this.field = field;
    }
  },
})