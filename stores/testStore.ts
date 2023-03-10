export const useCountStore = defineStore('CountStore', {
    //...
  });
  
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCountStore, import.meta.hot));
  }