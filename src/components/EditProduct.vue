<template>
    <div class="edit-product-form">
      <h1>Edit Produk</h1>
  
      <div v-if="error" class="error-message">{{ error }}</div>
  
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nama Produk:</label>
          <input v-model="product.name" id="name" type="text" placeholder="Nama Produk" required />
        </div>
  
        <div class="form-group">
          <label for="price">Harga:</label>
          <input v-model="product.price" id="price" type="number" placeholder="Harga Produk" required />
        </div>
  
        <div class="form-group">
          <label for="stock">Stok:</label>
          <input v-model="product.stock" id="stock" type="number" placeholder="Jumlah Stok" required />
        </div>
  
        <button type="submit" class="submit-btn">Simpan Perubahan</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    setup() {
      const product = ref({ name: '', price: '', stock: '', id: '' });
      const error = ref(null);
      const route = useRoute();
      const router = useRouter();
  
      const fetchProduct = async (id) => {
        console.log("Fetching product with ID:", id);  
        try {
          const response = await axios.get(`http://localhost:2000/product/${id}`);
          product.value = response.data.data;
        } catch (err) {
          error.value = 'Gagal mengambil data produk';
          console.error('Error fetching product:', err);
        }
      };
  
      const submitForm = async () => {
        try {
          console.log("Submitting form with data:", product.value);
          await axios.put(`http://localhost:2000/product/${product.value.id}`, product.value);
          alert('Produk berhasil diperbarui!');
          router.push('/');
        } catch (err) {
          console.error('Error saving product:', err);
          error.value = 'Terjadi kesalahan saat memperbarui produk.';
        }
      };
  
      onMounted(() => {
        const productId = route.params.id;
        if (productId) {
          fetchProduct(productId);
        } else {
          error.value = 'ID produk tidak ditemukan.';
        }
      });
  
      return { product, submitForm, error };
    }
  };
  </script>
  
  <style scoped>
  .edit-product-form {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 15px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-bottom: 15px;
  }
  </style>
  