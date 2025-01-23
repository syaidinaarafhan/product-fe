<template>
    <div class="orders">
      <h1>Daftar Pesanan</h1>
  
      <div v-if="isLoading" class="loading">Loading...</div>
  
      <div v-if="error" class="error">{{ error }}</div>
  
      <div v-if="!isLoading && !error">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <h3>Order ID: {{ order.id }}</h3>
          <p><strong>Customer:</strong> {{ order.customer_name }}</p>
          <p><strong>Order Date:</strong> {{ formatDate(order.order_date) }}</p>
          <p><strong>Total Items:</strong> {{ order.items.length }}</p>
          <p><strong>Total Price:</strong> {{ calculateTotalPrice(order.items) }}</p>
          
          <h4>Rincian Item Pesanan:</h4>
          <table class="order-items-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Jumlah</th>
                <th>Harga</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.items" :key="item.id">
                <td>{{ item.product.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.quantity * item.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const orders = ref([]);
      const isLoading = ref(true);
      const error = ref(null);
  
      const fetchOrders = async () => {
        try {
          const response = await axios.get('http://localhost:2000/getOrders');
          orders.value = response.data.data;
          isLoading.value = false;
        } catch (err) {
          console.error('Error fetching orders:', err);
          error.value = 'Gagal mengambil data pesanan.';
          isLoading.value = false;
        }
      };
  
      const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + (item.quantity * item.price), 0);
      };
  
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
      };
  

      onMounted(fetchOrders);
  
      const currency = (value) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(value);
      };
  
      return { orders, isLoading, error, calculateTotalPrice, formatDate, currency };
    }
  };
  </script>
  
  <style scoped>
  .orders {
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .loading,
  .error {
    text-align: center;
    font-size: 16px;
    padding: 10px;
  }
  
  .error {
    color: red;
  }
  
  .order-card {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .order-card h3 {
    color: #333;
  }
  
  .order-items-table {
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
  }
  
  .order-items-table th,
  .order-items-table td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .order-items-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .order-items-table td {
    background-color: #f9f9f9;
  }
  
  table tr:nth-child(even) {
    background-color: #f1f1f1;
  }
  
  table tr:hover {
    background-color: #e0e0e0;
  }
  
  h4 {
    margin-top: 20px;
    color: #333;
  }
  </style>
  