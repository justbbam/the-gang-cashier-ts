<template>
    <div class="product-card">
        <h4 class="mx-0 my-0">{{ product.name }}</h4>
        <p class="b3 text-dark-gray mx-0 my-0">{{ product.description }}</p>
        <div class="product-card-footer">
            <h4 class="fw-600 mx-0 my-0">{{ formatCurrency(product.price) }}</h4>
            <div class="product-actions">
                <QuantityButton :productId="product.id" />
                <div v-show="quantity === 0">
                    <button class="btn-cart" @click="addToOrder">
                        <i class="icon-cart">
                            <img src="../assets/icons/shopping-cart.svg" alt="" srcset="" />
                        </i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps } from 'vue';
import { useCurrentOrderStore } from '../stores/currentOrderStore';
import QuantityButton from './QuantityButton.vue';
import { currencyFormat } from '../filters';

const formatCurrency = currencyFormat;
const props = defineProps<{
    product: { id: number; name: string; description: string; price: number };
}>();

const orderStore = useCurrentOrderStore();

const quantity = computed(() => {
    const item = orderStore.orderItems.find(
        (item) => item.id === props.product.id
    );
    return item ? item.quantity : 0;
});

const addToOrder = () => {
    orderStore.addItem({
        id: props.product.id,
        name: props.product.name,
        price: props.product.price,
    });
};
</script>

<style lang="scss" scoped>
    @import '../assets/main.scss';

    .product-card {
        background: #101010;
        border-radius: 0.85rem;
        padding: 1rem;
        color: #fff;
        border: #373737 1px solid;
        display: grid;
        grid-template-rows: auto 3fr auto;
        gap: 0.5rem;
        align-content: stretch;
        justify-items: stretch;
    }

    .product-actions {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .product-card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .btn-cart {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        border: none;
        background: $primary-red;
        cursor: pointer;
        justify-self: end;
    }

    .icon-cart {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .btn-qty-group {
        background-color: #fd5351;
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
