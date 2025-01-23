<template>
    <div class="order-form">
      <h1>Buat Pesanan Baru</h1>
      
      <div v-if="error" class="error-message">{{ error }}</div>
  
      <form @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="customer_name">Nama Customer:</label>
          <input v-model="order.customer_name" id="customer_name" type="text" placeholder="Nama Customer" required />
        </div>
  
        <div v-for="(item, index) in order.items" :key="index" class="form-group">
          <label for="product">Produk:</label>
          <select v-model="item.product_id" required>
            <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.name }}
            </option>
          </select>
  
          <label for="quantity">Jumlah:</label>
          <input v-model="item.quantity" type="number" min="1" required />
  
          <button type="button" @click="removeItem(index)" class="remove-item-btn">Hapus Item</button>
        </div>
  
        <button type="button" @click="addItem" class="add-item-btn">Tambah Item</button>
        <button type="submit" class="submit-btn">Buat Pesanan</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const order = ref({
        customer_name: '',
        items: [{ product_id: '', quantity: 1 }]
      });
      
      const products = ref([]);
      const error = ref(null);
  
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:2000/getProducts');
          products.value = response.data.data;
        } catch (err) {
          error.value = 'Gagal mengambil data produk.';
          console.error('Error fetching products:', err);
        }
      };
  
      const addItem = () => {
        order.value.items.push({ product_id: '', quantity: 1 });
      };
  
      const removeItem = (index) => {
        order.value.items.splice(index, 1);
      };
  
      const submitOrder = async () => {
        try {
          const response = await axios.post('http://localhost:2000/postOrders', order.value);
          if (response && response.data) {
            console.log('Pesanan berhasil dibuat:', response.data);
            alert('Pesanan berhasil dibuat!');
            order.value = { customer_name: '', items: [{ product_id: '', quantity: 1 }] };
          }
        } catch (err) {
          error.value = 'Gagal membuat pesanan.';
          console.error('Error creating order:', err);
          alert('Gagal membuat pesanan');
        }
      };
  
      onMounted(fetchProducts);
  
      return { order, products, addItem, removeItem, submitOrder, error };
    }
  };
  </script>
  
  <style scoped>
  .order-form {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 15px;
  }
  
  .add-item-btn {
    background-color: #28a745;
    margin-top: 15px;
  }
  
  .add-item-btn:hover {
    background-color: #218838;
  }
  
  .remove-item-btn {
    background-color: #dc3545;
    margin-top: 5px;
  }
  
  .remove-item-btn:hover {
    background-color: #c82333;
  }
  </style>
  