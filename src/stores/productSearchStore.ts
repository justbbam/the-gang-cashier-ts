import { defineStore } from 'pinia';

export const useProductSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: ''
  }),
  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query;
    }
  }
});
