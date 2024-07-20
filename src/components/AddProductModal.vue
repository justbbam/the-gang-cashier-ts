<template>
    <div v-if="modelValue" class="modal-overlay" @click.stop>
        <div class="modal" @click.stop>
            <div class="modal-header">
                <h2 class="">Add New Product</h2>
            </div>
            <div class="modal-body">
                <form @submit.prevent="createProduct">
                    <div class="form-group mb-3 b2">
                        <label for="product-name">Product Name</label>
                        <input id="product-name" v-model="productName" type="text" placeholder="Enter product name" :class="{ 'is-invalid': errors.productName }" />
                        <div v-if="errors.productName" class="invalid-feedback">{{ errors.productName }}</div>
                    </div>
                    <div class="form-group mb-3 b2">
                        <label for="description">Description</label>
                        <textarea id="description" v-model="description" placeholder="Enter description" :class="{ 'is-invalid': errors.description }" class="hide-scrollbar"></textarea>
                        <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
                    </div>
                    <div class="form-group mb-3 b2">
                        <label for="price">Price</label>
                        <input id="price" v-model="price" type="text" placeholder="Enter price" :class="{ 'is-invalid': errors.price }" min="0" />
                        <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" @click="close">
                            <h3 class="m-0">Close</h3>
                        </button>
                        <button type="submit" class="btn-primary bg-peach">
                            <h3 class="m-0">Create</h3>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useProductStore } from '../stores/productStore';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emits = defineEmits(['update:modelValue']);

const productName = ref('');
const description = ref('');
const price = ref<number | null>(null); 
const errors = ref<{ productName?: string, description?: string, price?: string }>({});

const productStore = useProductStore();

const close = () => {
    emits('update:modelValue', false);
};

const createProduct = () => {
    if (validateForm()) {
        const product = {
            name: productName.value,
            description: description.value,
            price: price.value
        };
        productStore.addProduct(product);
        close();
        resetForm();
    }
};

const validatePrice = () => {
    errors.value.price = '';
    if (!/^\d*\.?\d*$/.test(price.value)) {
        errors.value.price = 'Price should be a number.';
    }
};

const validateForm = () => {
    errors.value = {};

    if (!productName.value) {
        errors.value.productName = 'Product name is required.';
    }

    if (description.value.length > 100) {
        errors.value.description = 'Description should not exceed 100 characters.';
    }

    if (!price.value || !/^\d*\.?\d*$/.test(price.value)) {
        errors.value.price = 'Price should be a number.';
    }

    return Object.keys(errors.value).length === 0;
};

const resetForm = () => {
    productName.value = '';
    description.value = '';
    price.value = null;
    errors.value = {};
};

watch(price, validatePrice);
</script>

<style scoped>
    label {
        color: #fff;
        margin-bottom: 0.25rem;
    }

    input,
    textarea {
        padding: 10px;
        border: 1px solid #373737;
        border-radius: 5px;
        background: #101010;
        color: #fff;
        font-size: 1rem;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal {
        background: #333;
        padding: 1.5rem;
        border-radius: 0.5rem;
        width: 100%;
        max-width: 20vw;
        margin: 0 1rem;
    }

    .modal-header {
        margin-bottom: 20px;
        text-align: center;
    }

    .modal-body {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .modal-footer {
        display: flex;
        gap: 0.75rem;
        margin-top: 1rem;
    }

    .btn-secondary {
        background: rgba(0, 0, 0, 0);
        color: #fff;
        border: #fff 1px solid;
        padding: 0.65rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        width: 50%;
    }

    .btn-primary {
        color: #000;
        border: none;
        padding: 0.65rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        width: 50%;
    }

    @media (max-width: 768px) {
        .modal {
            width: calc(100% - 2rem); 
            max-width: 100vw;
        }
    } 
</style>
