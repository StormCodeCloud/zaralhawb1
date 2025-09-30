<template>
  <!-- Hero no estilo usado no resto do site -->
  <section class="hero d-flex align-items-center justify-content-center"
    :style="{ backgroundImage: `url(${heroImg})` }">
    <div class="overlay"></div>
    <div class="hero-content text-center">
      <h1 class="hero-title">Loja Zaralha Rust</h1>
      <p class="hero-subtitle">
        Itens exclusivos, kits VIP e recursos para os seus servidores Rust
      </p>
    </div>
  </section>

  <!-- Categorias -->
  <section class="shop-nav container-fluid py-3">
    <div class="container">
      <ul class="nav nav-pills">
        <li class="nav-item" v-for="cat in categories" :key="cat.name">
          <button class="nav-link" :class="{ active: currentCat === cat.name }" @click="currentCat = cat.name">
            {{ cat.label }}
          </button>
        </li>
      </ul>
    </div>
  </section>

  <!-- Pesquisa -->
  <section class="shop-search container-fluid py-3">
    <div class="container">
      <input type="text" v-model="searchTerm" placeholder="Nome do item..." class="form-control">
    </div>
  </section>

  <!-- Grelha de produtos -->
  <section class="shop-items container-fluid py-5">
    <div class="container">
      <div class="row g-4">
        <div v-for="item in filteredItems" :key="item.id" class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex">
          <div class="card flex-fill h-100">
            <div class="card-img-wrapper">
              <img :src="item.image" :alt="item.name" class="card-img-top">
              <span class="badge price">{{ item.price }} BRL</span>
              <span v-if="item.label" class="badge label">{{ item.label }}</span>
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ item.name }}</h5>
              <input id="quantidadeItem" class="form-control quantity-input" type="number" max="100" min="1"
                placeholder="Quantidade desejada">
              <p class="card-text flex-grow-1">{{ item.description }}</p>
              <button class="btn btn-warning mt-auto">Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import heroImg from "../assets/shop/shopRustbg.jpg";
import vipGold from "../assets/vips/vipgold.png";
import vipSilver from "../assets/vips/vipsilver.png";
import vipBronze from "../assets/vips/vipbronze.png";

// importa todos os ficheiros .webp da pasta
const icons = import.meta.glob("../assets/itens-rust/icons/*.webp", { eager: true });

const categories = [
  { name: 'all', label: 'Todos os itens' },
  { name: 'vip', label: 'Kits VIP' },
  { name: 'weapons', label: 'Armas' },
  { name: 'ammo', label: 'Munição' },
  { name: 'tools', label: 'Ferramentas' },
  { name: 'construction', label: 'Construção' },
  { name: 'resources', label: 'Recursos' },
  { name: 'medical', label: 'Médico' },
  { name: 'food', label: 'Comida' },
  { name: 'misc', label: 'Vestuário' },
  { name: 'traps', label: 'Armadilhas' },
  { name: 'eletrical', label: 'Eletricidade' },
  { name: 'vehiclesComponents', label: 'Componentes de Veiculos' },
  { name: 'other', label: 'Outros' },
];

const currentCat = ref('all');
const searchTerm = ref('');

const items = ref([
  { id: 1, name: 'VIP Gold', description: 'VIP preparado para aquele player que gosta de iniciar o wipe em grande!', price: 50, category: 'vip', image: vipGold },
  { id: 2, name: 'VIP Silver', description: 'VIP com o necessário para começar mediamente bem em um wipe solo.', price: 40, category: 'vip', label: 'Mais vendido', image: vipSilver },
  { id: 3, name: 'VIP Bronze', description: 'VIP para aquele iniciante que gosta de ter uma ajudinha de inicio!', price: 30, category: 'vip', image: vipBronze },
]);

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchesCategory = currentCat.value === 'all' || item.category === currentCat.value;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 60vh;
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

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #fff;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #f2a900;
  font-weight: 500;
}

.shop-nav,
.shop-search,
.shop-items {
  background-color: #0d0d0f;
  color: #fff;
}

/* --- FIX PARA AS CATEGORIAS --- */
.shop-nav .nav {
  flex-wrap: wrap;
  /* permite quebrar linha */
  gap: 0.5rem;
  /* espaçamento entre botões */
  justify-content: center;
  /* centraliza tudo */
}

.shop-nav .nav-link {
  color: #fff;
  background: transparent;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  transition: 0.2s;
}

.shop-nav .nav-link:hover {
  background: rgba(242, 169, 0, 0.15);
  border-color: #f2a900;
  color: #f2a900;
}

.shop-nav .nav-link.active {
  background-color: #f2a900;
  color: #0d0d0f;
  font-weight: 600;
  border-color: #f2a900;
}

/* ---------------------------- */

.card {
  background: #1a1a1f;
  color: #fff;
  border: none;
  border-radius: 8px;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 0 10px rgba(242, 169, 0, 0.4);
}

.card-img-wrapper {
  position: relative;
}

.badge.price {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: #f2a900;
  color: #0d0d0f;
}

.badge.label {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #d78e00;
}

.btn-warning {
  background-color: #f2a900;
  border: none;
}

.btn-warning:hover {
  background-color: #d78e00;
}

/* Estilos para o input de quantidade, integrando com layout do cartão */
.quantity-input {
  width: 100%;
  /* por padrão ocupa toda a largura do card-body */
  max-width: 140px;
  /* mas não fica demasiado largo em ecrãs grandes */
  margin: 0.5rem 0;
  /* separação entre título/descrição */
  padding: 0.375rem 0.5rem;
  /* similar ao form-control do bootstrap */
  border-radius: 6px;
  border: 1px solid #2b2b30;
  background: #0f0f12;
  color: #fff;
  text-align: center;
  /* centraliza o valor numérico */
  -moz-appearance: textfield;
  /* reduz setas no Firefox */
}

/* Remover setas em inputs number para WebKit */
.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Em ecrãs maiores permitir que o input se fixe numa largura agradável */
@media (min-width: 576px) {
  .quantity-input {
    width: auto;
  }
}
</style>
