<template>
    <div class="sidebar-content-container">
        <h3 class="current-order-title primary-white sidebar-content-header">
            <div class="d-flex">
                <img class="me-3" src="../assets/icons/notification-status.svg" alt="">
                Current Order
            </div>
            <span class="sidebar-title mb-2" v-show="totalItems > 0">
                {{ totalItems }} Item
            </span>
        </h3>
        <div class="sidebar-content-body hide-scrollbar">
            <ul class="order-list hide-scrollbar" v-show="totalItems > 0">
                <li v-for="item in orderItems" :key="item.id" class="order-item">
                    <div class="d-flex justify-content-between w-100">
                        <div class="item-info">
                            <h3 class="m-0">{{ item.name }}</h3>
                        </div>
                        <button class="btn-trash" @click="removeItem(item.id)">
                            <i class="icon-trash">
                                <img src="../assets/icons/trash.svg" alt="" srcset="">
                            </i>
                        </button>
                    </div>
                    <div class="d-flex justify-content-between align-item-center w-100">
                        <div class="item-quantity">
                            <QuantityButton :productId="item.id" />
                        </div>
                        <h4 class="m-0">{{ formatCurrency(item.price) }}</h4>
                    </div>
                </li>
            </ul>
            <div class="no-data-sidebar" v-show="totalItems === 0">
                <img src="../assets/icons/bag.svg" alt="" srcset="">
                <p class="b3 text-dark-gray">There are no item in your cart</p>
            </div>
        </div>
        <div class="sidebar-content-footer total-bg">
            <p class="b1 m-0">Total</p>
            <h3 class="m-0" v-show="orderItems.length > 0">{{ formatCurrency(totalPrice) }}</h3>
            <h3 class="m-0" v-show="orderItems.length === 0">-</h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCurrentOrderStore } from '../stores/currentOrderStore';
import QuantityButton from './QuantityButton.vue';
import { currencyFormat } from '../filters';

const formatCurrency = currencyFormat;
const orderStore = useCurrentOrderStore();
const orderItems = computed(() => orderStore.orderItems);
const totalItems = computed(() => orderStore.totalItems);
const totalPrice = computed(() => orderStore.totalPrice);

const removeItem = (id: number) => {
    orderStore.removeItem(id);
};
</script>

<style scoped>
.current-order-title {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0rem 0rem 0.5rem 0rem;
}

.order-list {
    list-style: none;
    padding: 0;
}

.order-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    color: #fff;
    padding: 0.75rem;
    gap: 0.5rem;
    background-color: #212121;
    border-radius: 0.5rem;
    border: #373737 1px solid;
}

.item-info {
    flex-grow: 1;
}

.item-quantity {
    display: flex;
    align-items: center;
    gap: 10px;
}

.sidebar-title {
    display: flex;
    align-items: center;
}

.btn-trash {
    background: rgba(0, 0, 0, 0);
    border: none;
    display: inline-flex;
    align-items: center;
}

.icon-trash {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.25rem;
    cursor: pointer;
}

.btn-qty-group {
    border: #fff 1px solid;
}

.total-bg {
    background: #B9B9B9;
}
</style>
