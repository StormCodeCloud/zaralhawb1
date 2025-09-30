<template>
  <section
    class="hero shop-selector d-flex align-items-center justify-content-center"
    :style="{ backgroundImage: `url(${shopbg})` }"
  >
    <div class="overlay"></div>
    <div class="hero-content text-center">
      <h1 class="shop-title">Escolha a sua Loja</h1>
      <div class="shop-buttons">
        <a class="shop-btn dayz" href="/shopDZ" @click="showWarning('DayZ')">DayZ Shop</a>
        <a class="shop-btn rust" href="/shopRU" @click="showWarning('Rust')">Rust Shop</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import shopbg from '@/assets/shop/shopbg.png'
function showWarning(shop) {
  alert(`${shop} Shop está em manutenção, mas já pode ser visualizada.`)
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh; /* ocupa a tela toda */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #0d0d0f;
}

.hero .overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65); /* escurece o fundo */
}

.hero-content {
  position: relative;
  z-index: 1;
}

/* título */
.shop-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #f2a900;
  font-weight: 900;
  text-transform: uppercase;
}

/* botões */
.shop-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.shop-btn {
  padding: 1rem 2.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  transition: 0.3s;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

/* cores */
.shop-btn.dayz {
  background: #b22222;
  color: #fff;
}

.shop-btn.rust {
  background: #f2a900;
  color: #0d0d0f;
}

/* hover */
.shop-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(242, 169, 0, 0.5);
}
</style>
