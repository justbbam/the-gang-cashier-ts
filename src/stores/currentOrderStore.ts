import { defineStore } from 'pinia';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const useCurrentOrderStore = defineStore('currentOrder', {
  state: () => ({
    orderItems: [] as OrderItem[],
  }),
  getters: {
    totalItems(state) {
      return state.orderItems.reduce((acc, item) => acc + item.quantity, 0);
    },
    totalPrice(state) {
      return state.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    getQuantity: (state) => (id: number) => {
      const item = state.orderItems.find(item => item.id === id);
      return item ? item.quantity : 0;
    },
  },
  actions: {
    addItem(product: Omit<OrderItem, 'quantity'>) {
      const existingItem = this.orderItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.orderItems.push({ ...product, quantity: 1 });
      }
    },
    removeItem(productId: number) {
      this.orderItems = this.orderItems.filter(item => item.id !== productId);
    },
    increaseQuantity(productId: number) {
      const item = this.orderItems.find(item => item.id === productId);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity(productId: number) {
      const item = this.orderItems.find(item => item.id === productId);
      if (item) {
        item.quantity--;
        if (item.quantity === 0) {
          this.removeItem(productId);
        }
      }
    },
  },
});
