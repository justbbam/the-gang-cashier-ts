<template>
  <div class="container">
    <div class="main-content">
      <Header />
      <Banner />
      <ProductSearch />
      <ProductList :products="products" />
    </div>
    <div class="sidebar">
      <CurrentOrder />
      <div class="sidebar-divider"></div>
      <PaymentSummary />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, computed  } from 'vue';
  import Header from './components/Header.vue';
  import Banner from './components/Banner.vue';
  import ProductList from './components/ProductList.vue';
  import ProductSearch from './components/ProductSearch.vue';
  import CurrentOrder from './components/CurrentOrder.vue';
  import PaymentSummary from './components/PaymentSummary.vue';
  import { useProductStore } from './stores/productStore';

  const productStore = useProductStore();

  onMounted(() => {
    productStore.initializeProducts();
  });

  const products = computed(() => productStore.products);
</script>