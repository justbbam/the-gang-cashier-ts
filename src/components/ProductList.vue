<template>
    <div class="product-list-container hide-scrollbar">
        <div v-if="filteredProducts.length === 0" class="no-data-container">
            <img class="icon-no-data" src="../assets/icons/document-text.svg" alt="No data available" />
            <p class="primary-white b2 fw-600 my-2">No data available</p>
            <p class="text-dark-gray b3 m-0">Please add product information.</p>
        </div>
        <div v-else class="product-list">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from '../stores/productStore';
import { useProductSearchStore } from '../stores/productSearchStore';
import ProductCard from './ProductCard.vue';

const productStore = useProductStore();
const searchStore = useProductSearchStore();

const products = computed(() => productStore.products);

const filteredProducts = computed(() => {
    return products.value.filter(product =>
        product.name.toLowerCase().includes(searchStore.searchQuery.toLowerCase())
    );
});
</script>

<style scoped>
.product-list-container {
    flex-grow: 1;
    overflow-y: scroll;
}

.no-data-container {
    background-color: black;
    height: 100%;
    border-radius: 0.5rem;
    border: #373737 1px solid;
    align-content: center;
    text-align: center;
}

.product-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

}

@media (max-width: 1200px) {
    .product-list {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media all and (min-width: 768px) and (max-width: 991.9px) {
    .product-list {
        grid-template-columns: repeat(2, 1fr);
    }

    .no-data-container {
        height: 40vh;
    }
}

@media all and (max-width: 767.9px) {
    .product-list {
        grid-template-columns: repeat(2, 1fr);
    }

    .no-data-container {
        height: 65vh;
    }
}
</style>
