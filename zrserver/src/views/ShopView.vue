<template>
  <section class="hero shop-selector d-flex align-items-center justify-content-center"
    :style="{ backgroundImage: `url(${shopbg})` }">
    <div class="overlay"></div>
    <div class="hero-content text-center">
      <h1 class="shop-title">Escolha a sua Loja</h1>

      <div class="shop-buttons" v-if="!rustOptions">
        <!-- Botões iniciais -->
        <a class="shop-btn dayz" href="/shopDZ" @click="showWarning('DayZ')">DayZ Shop</a>
        <button class="shop-btn rust" @click="rustOptions = true">Rust Shop</button>
      </div>

      <div class="shop-buttons" v-else>
        <!-- Botões de versões Rust -->
        <a class="shop-btn rust" href="/shopRU" @click="showWarning('Rust 2275')">Rust 2275</a>
        <a class="shop-btn rust" href="/shopRU2388" @click="showWarning('Rust 2388')">Rust 2388</a>
        <button class="shop-btn back" @click="rustOptions = false">← Voltar</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import shopbg from '@/assets/shop/shopbg.png'

const rustOptions = ref(false)

function showWarning(shop) {
  alert(`${shop} Shop está em manutenção, mas já pode ser visualizada.`)
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #0d0d0f;
}
.hero .overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
}
.hero-content {
  position: relative;
  z-index: 1;
}
<<<<<<< HEAD

=======
>>>>>>> d44035e68e6a6218a6e45b76af2f4f2a28d9a9d7
.shop-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #f2a900;
  font-weight: 900;
  text-transform: uppercase;
}
<<<<<<< HEAD

=======
>>>>>>> d44035e68e6a6218a6e45b76af2f4f2a28d9a9d7
.shop-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}
.shop-btn {
  padding: 1rem 2.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.3s;
<<<<<<< HEAD
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  border: none;
}

=======
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  cursor: pointer;
  border: none;
}
>>>>>>> d44035e68e6a6218a6e45b76af2f4f2a28d9a9d7
.shop-btn.dayz {
  background: #b22222;
  color: #fff;
}
.shop-btn.rust {
  background: #f2a900;
  color: #0d0d0f;
}
<<<<<<< HEAD

=======
>>>>>>> d44035e68e6a6218a6e45b76af2f4f2a28d9a9d7
.shop-btn.back {
  background: #444;
  color: #fff;
}
<<<<<<< HEAD

=======
>>>>>>> d44035e68e6a6218a6e45b76af2f4f2a28d9a9d7
.shop-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(242, 169, 0, 0.5);
}
</style>
