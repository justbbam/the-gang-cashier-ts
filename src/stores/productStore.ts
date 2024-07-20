import { defineStore } from 'pinia';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
  }),
  actions: {
    initializeProducts() {
      this.products = [
        { id: 1, name: 'CAMPUS OOS SHOES', description: 'This product is excluded from all promotional discounts.', price: 1046 },
        { id: 2, name: 'FLOWER EMBROIDERY', description: 'Embroidered florals inspired by digital art add a fresh', price: 900 },
        { id: 3, name: 'SUPERSTAR XLG SHOES', description: 'The adidas Superstar shoes have continued to show off', price: 2200 },
        { id: 4, name: 'SUPERSTAR SHOES', description: 'Keep the energetic waves flowing with these adidas.', price: 500 },
        { id: 5, name: 'STAN SMITH CS SHOES', description: 'Sinc e debuting in the mid-\'60s, the adidas\'', price: 600 },
        { id: 6, name: 'NMD_S1 SOCK SHOES', description: 'Shoes that fit like socks? That\'s a yes for us.', price: 500 },
        { id: 7, name: 'ASTIR SHOES', description: 'these adidas shoes shape an expressive abstract vibe', price: 500 },
        { id: 8, name: 'STAN SMITH SHOES', description: 'adidas Stan Smith shoes have been an icon for decades', price: 800 },
        { id: 9, name: 'ADIDAS 4DFWD 2 RUNNING SHOES', description: 'The PRIMEKNT and the stripes are reflective while the ...', price: 1000 },
        { id: 10, name: 'SWITCH FWD TURNS GRAVITY INTO FORWAR...', description: 'Embroidered florals inspired by digital art add a fresh', price: 800 },
        { id: 11, name: 'SFORUM LOW SHOES', description: 'A narrow toe cut puts a modern, stylish spin on this...', price: 500 },
        { id: 12, name: 'ULTRABOOST LIGHT SHOES', description: 'Keep the energetic waves flowing with these adidas.', price: 500 }
      ]; 
    },
    addProduct(product: Omit<Product, 'id'>) {
      const newProduct = {
        ...product,
        id: this.products.length + 1,
      };
      this.products.push(newProduct);
    }, 
  },
});