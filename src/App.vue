<template>
  <div id="app">
    <header>
      <h1>Manajemen Produk dan Pesanan</h1>
      <nav>
        <ul>
          <li><router-link to="/">Produk</router-link></li>
          <li><router-link to="/add-product">Tambah Produk</router-link></li>
          <li><router-link to="/orders">Pesanan</router-link></li>
          <li><router-link to="/order">Tambah Pesanan</router-link></li>
        </ul>
      </nav>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

header {
  background-color: #333;
  color: white;
  padding: 10px 0;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
}

nav ul li {
  margin: 0 15px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a:hover {
  text-decoration: underline;
}
</style>