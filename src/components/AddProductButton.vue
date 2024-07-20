<template>
    <div>
        <button class="btn-primary-gradient h4" @click="showModal = true">
            <h4 class="button-content">
                <img class="me-2" src="../assets/icons/add.svg" />
                Add New Product
            </h4>
        </button>
        <AddProductModal v-model:modelValue="showModal" @create="addProduct" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProductStore } from '../stores/productStore';
import AddProductModal from './AddProductModal.vue';

const showModal = ref(false);
const productStore = useProductStore();

const addProduct = (product: { name: string; description: string; price: number }) => {
    productStore.addProduct(product);
    showModal.value = false;
};
</script>

<style lang="scss" scoped>
    .btn-primary-gradient {
        background-image: linear-gradient(102deg, #e55250 35.35%, #ffc7a0 124.4%);
        color: #ffffff;
        padding: 0.5rem 0.5rem;
        border-radius: 8px;
        border: 0;
        cursor: pointer;
    }
    .button-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
