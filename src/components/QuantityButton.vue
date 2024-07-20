<template>
    <div class="btn-qty-group" v-show="quantity > 0">
        <button class="btn-qty-operate" @click="decrease">-</button>
        <h4 class="mx-2">{{ quantity }}</h4>
        <button class="btn-qty-operate" @click="increase">+</button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps } from 'vue';
import { useCurrentOrderStore } from '../stores/currentOrderStore';

const props = defineProps({
    productId: {
        type: Number,
        required: true
    }
});

const currentOrderStore = useCurrentOrderStore();
const quantity = computed(() => currentOrderStore.getQuantity(props.productId));

const increase = () => {
    currentOrderStore.increaseQuantity(props.productId);
};

const decrease = () => {
    currentOrderStore.decreaseQuantity(props.productId);
};
</script>

<style lang="scss" scoped>
    .btn-qty-group {
        display: inline-flex;
        align-items: center;
        border-radius: 2rem;
        padding: 0.25rem 0.5rem;
    }

    .btn-qty-operate {
        background: none;
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>