<template>
  <div class="product-search">
    <div class="primary-white b1 fw-500">All Product</div>
    <div class="search-container">
      <i class="search-icon"><img src="../assets/icons/search-normal.svg" alt="" srcset=""></i>
      <input v-model="searchQuery" type="text" class="search-input b2" placeholder="Search by name" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useProductSearchStore } from '../stores/productSearchStore';

  const searchStore = useProductSearchStore();

  const searchQuery = computed({
    get: () => searchStore.searchQuery,
    set: (value: string) => searchStore.setSearchQuery(value)
  });
</script>

<style lang="scss" scoped>
  .product-search {
    margin: 1rem 0rem;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .search-container {
    border: #373737 1px solid;
    display: flex;
    align-items: center;
    background-color: #000000;
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 30%;
  }

  .search-icon {
    color: #929292;
    margin-right: 10px;
  }

  .search-input {
    background: transparent;
    border: none;
    outline: none;
    color: #929292;
    width: 100%;

    &::placeholder {
      color: #929292;
    }
  }

@media all and (max-width: 767.9px) {
    .search-container {
        width: 60%;
      }
}

@media all and (min-width: 768px) and (max-width: 991.9px) {
    .search-container {
        width: 60%;
      }
}

@media all and (min-width: 992px) and (max-width: 1023.9px) {}

@media only screen and (min-width: 1024px) and (max-width: 1279.9px) {}
</style>
