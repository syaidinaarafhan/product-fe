<template>
    <div class="product-list">
      <h1>Daftar Produk</h1>
      
      <table class="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Produk</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <button @click="editProduct(product.id)" class="edit-btn">Edit</button>
              <button @click="deleteProduct(product.id)" class="delete-btn">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const products = ref([]);
      const router = useRouter();
  
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:2000/getProducts');
          products.value = response.data.data;
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      const editProduct = (id) => {
        router.push(`/edit-product/${id}`);
      };
  
      const deleteProduct = async (id) => {
        try {
          await axios.delete(`http://localhost:2000/product/${id}`);
          fetchProducts();
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
  
      onMounted(fetchProducts);
  
      return { products, deleteProduct, editProduct };
    }
  };
  </script>
  
  <style scoped>
  .product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .product-table th, .product-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .product-table th {
    background-color: #f2f2f2;
    color: #333;
  }
  
  .product-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .product-table tr:hover {
    background-color: #e0e0e0;
  }
  
  button {
    padding: 6px 12px;
    margin: 5px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
  }
  
  .edit-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  .currency {
    font-weight: bold;
    color: #2e8b57;
  }
  
</style>  