<template>
  <div class="sidebar-content-container">
    <div class="primary-white sidebar-content-header  mb-2">
      <div class="d-flex mb-2">
        <img class="me-3" src="../assets/icons/money-3.svg" alt="" />
        <h3 class="m-0">Payment Summary</h3>
      </div>
      <label class="b2" for="receive-money">Received Money </label>
      <div class="received-money-group">
        <input id="receive-money" class="receive-input b2" v-model.number="receivedMoney" type="number" placeholder="Enter received money" :class="{ 'is-invalid': errors.receivedMoney }" />
        <button class="receive-btn" @click="calculateChange">
          <h4>Calculate</h4>
        </button>
      </div>
        <div v-if=" errors.receivedMoney" class="invalid-feedback">{{ errors.receivedMoney }} </div>
    </div>
    <div class="sidebar-content-body hide-scrollbar">
      <div v-show="totalItems > 0">
        <div v-for="(combination, index) in allChange" :key="index" class="combination-option text-white">
          <h4 class="text-white mb-2">
            Customer Withdrawal Options {{ index + 1 }}
          </h4>
          <div class="coin-container">
            <div class="coin-card" v-for="(coin, idx) in combination" :key="idx">
              <div class="d-flex align-item-center">
                <img src="../assets/coins/COIN-11.svg" alt="" v-if="coin.coin == 11" />
                <img src="../assets/coins/COIN-7.svg" alt="" v-if="coin.coin == 7" />
                <img src="../assets/coins/COIN-5.svg" alt="" v-if="coin.coin == 5" />
                <img src="../assets/coins/COIN-1.svg" alt="" v-if="coin.coin == 1" />
              </div>
              <div class="coin">
                <span class="b3">฿ {{ coin.coin }}</span>
                <div class="d-flex">
                  <h4 class="m-0">{{ coin.value }}</h4>
                  <span class="b2 text-dark-gray">&nbsp;Coins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data-sidebar" v-show="totalItems === 0">
        <img src="../assets/icons/note-remove.svg" alt="" srcset="" />
        <p class="b3 text-dark-gray">
          Please select a product and provide the amount of money
          received from the customer
        </p>
      </div>
    </div>
    <div class="sidebar-content-footer payment-total-bg">
      <p class="b1 m-0">Total</p>
      <h3 class="m-0" v-show="changeMoney > 0">
        {{ formatCurrency(changeMoney) }}
      </h3>
      <h3 class="m-0" v-show="changeMoney === 0">-</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCurrentOrderStore } from '../stores/currentOrderStore';
import { usePaymentSummaryStore } from '../stores/paymentSummaryStore';
import { currencyFormat } from '../filters';

const formatCurrency = currencyFormat;
const currentOrderStore = useCurrentOrderStore();
const paymentStore = usePaymentSummaryStore();

const receivedMoney = ref<number | null>(null);
const totalItems = computed(() => currentOrderStore.totalItems);
const totalPrice = computed(() => currentOrderStore.totalPrice);
const changeMoney = computed(() => paymentStore.changeMoney);
const allChange = computed(() => paymentStore.allChange);
const errors = ref<{ receivedMoney?: string}>({});

const calculateChange = () => {
  errors.value = {};
  if (receivedMoney.value !== null) {
    if (receivedMoney.value <= totalPrice.value) {
      errors.value.receivedMoney = 'Receive money less than total price.';
      return
    }
    paymentStore.setReceivedMoney(receivedMoney.value);
    paymentStore.setTotalAmount(totalPrice.value);
    paymentStore.calculateChange();
  }
};

watch(totalItems, (newTotalItems) => {
  if (newTotalItems === 0) {
    receivedMoney.value = null
    paymentStore.change = 0;
    paymentStore.allCombinations = [];
  }
});
</script>

<style lang="scss" scoped>
label {
  display: block;
}

.payment-summary {
  background-color: #1e1e1e;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
}

.received-money {
  margin-bottom: 20px;
}

.change-option {
  background-color: #2e2e2e;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.coin {
  margin-left: 10px;
}

.payment-total-bg {
  background-color: #c9ac83;
}

.received-money-group {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.receive-input {
  background: transparent;
  color: #929292;
  background-color: #000000;
  width: 100%;
  padding: 0.5rem;
  border: #373737 1px solid;
  border-radius: 0.5rem;
}

.receive-btn {
  background-color: #ffc7a0;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}

.coin-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.combination-option {
  margin-bottom: 1rem;
}

.coin-card {
  background: #373737;
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: #fff;
  border: #373737 1px solid;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.coin {
  display: flex;
  flex-direction: column;
}

</style>