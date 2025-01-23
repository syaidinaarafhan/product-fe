<template>
    <div class="add-product">
      <h1>Tambah Produk</h1>
      
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nama Produk:</label>
          <input v-model="product.name" id="name" type="text" required />
          <span v-if="nameError" class="error-message">{{ nameError }}</span>
        </div>
        
        <div class="form-group">
          <label for="price">Harga:</label>
          <input v-model="product.price" id="price" type="number" required />
          <span v-if="priceError" class="error-message">{{ priceError }}</span>
        </div>
        
        <div class="form-group">
          <label for="stock">Stok:</label>
          <input v-model="product.stock" id="stock" type="number" required />
          <span v-if="stockError" class="error-message">{{ stockError }}</span>
        </div>
        
        <button type="submit" class="submit-btn">Tambah Produk</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const product = ref({
        name: '',
        price: '',
        stock: ''
      });
  
      const nameError = ref('');
      const priceError = ref('');
      const stockError = ref('');
  
      const router = useRouter();
  
      const validateName = () => {
        if (!product.value.name || product.value.name.length < 3) {
          nameError.value = 'Nama produk harus lebih dari 2 karakter';
          return false;
        } else {
          nameError.value = '';
          return true;
        }
      };
  
      const validatePrice = () => {
        if (product.value.price <= 0) {
          priceError.value = 'Harga harus lebih dari 0';
          return false;
        } else {
          priceError.value = '';
          return true;
        }
      };
  
      const validateStock = () => {
        if (product.value.stock < 0) {
          stockError.value = 'Stok tidak boleh negatif';
          return false;
        } else {
          stockError.value = '';
          return true;
        }
      };
  
      const validateForm = () => {
        const isNameValid = validateName();
        const isPriceValid = validatePrice();
        const isStockValid = validateStock();
        return isNameValid && isPriceValid && isStockValid;
      };
  
      const submitForm = async () => {
        if (validateForm()) {
          try {
            await axios.post('http://localhost:2000/postProduct', product.value);
            alert('Produk berhasil ditambahkan!');
            router.push('/');
          } catch (error) {
            console.error('Error saving product:', error);
            alert('Terjadi kesalahan saat menyimpan produk.');
          }
        }
      };
  
      return { product, submitForm, nameError, priceError, stockError };
    }
  };
  </script>
  
  <style scoped>
  .add-product {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
  </style>
  