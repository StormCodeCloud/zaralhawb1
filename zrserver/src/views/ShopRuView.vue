<template>
  <!-- Hero -->
  <section
    class="hero d-flex align-items-center justify-content-center"
    :style="{ backgroundImage: `url(${heroImg})` }"
  >
    <div class="overlay"></div>
    <div class="hero-content text-center">
      <h1 class="hero-title">LOJA ZARALHA RUST</h1>
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
          <button
            class="nav-link"
            :class="{ active: currentCat === cat.name }"
            @click="currentCat = cat.name"
          >
            {{ cat.label }}
          </button>
        </li>
      </ul>
    </div>
  </section>

  <!-- Pesquisa -->
  <section class="shop-search container-fluid py-3">
    <div class="container">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Nome do item..."
        class="form-control search-box"
      />
    </div>
  </section>

  <!-- Grelha de produtos -->
  <section class="shop-items container-fluid py-5">
    <div class="container">
      <div class="row g-4">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="col-12 col-sm-6 col-lg-4 col-xl-3 d-flex"
        >
          <div class="card flex-fill h-100">
            <div class="card-img-wrapper">
              <img :src="item.image" :alt="item.name" class="card-img-top" />
              <!-- Mostra preço + se for pacote -->
              <span class="badge price">
                {{ item.price }} BRL<span v-if="item.amount">
                  / x{{ item.amount }}</span
                >
              </span>
              <span v-if="item.label" class="badge label">{{
                item.label
              }}</span>
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ item.name }}</h5>

              <!-- Botão para abrir modal de detalhes -->
              <button
                type="button"
                class="btn btn-outline-warning mt-auto"
                @click="openItem(item)"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Modal de Detalhes -->
  <transition name="fade">
    <div v-if="selectedItem" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal" aria-label="Fechar">
          ×
        </button>

        <h2 class="modal-title">{{ selectedItem.name }}</h2>

        <div class="modal-media">
          <img
            :src="selectedItem.image"
            :alt="selectedItem.name"
            class="modal-img"
          />
        </div>

        <!-- Descrição -->
        <p v-if="selectedItem.description" class="modal-desc">
          {{ selectedItem.description }}
        </p>

        <!-- Kit VIP -->
        <div v-if="selectedItem.kit?.length" class="vip-kit-box">
          <h6 class="vip-kit-title">Conteúdo do Kit</h6>
          <ul class="list-unstyled kit-list">
            <li v-for="k in selectedItem.kit" :key="k.name" class="kit-item">
              <img :src="k.icon" alt="" class="kit-icon me-2" />
              <span class="me-1">{{ k.name }}</span>
              <small class="text-muted">x{{ k.amount }}</small>
            </li>
          </ul>
        </div>

        <!-- Quantidade -->
        <div class="quantity-wrapper">
          <label class="qty-label">Quantidade</label>
          <div class="qty-controls">
            <button
              type="button"
              class="qty-btn"
              @click="decrease(selectedItem)"
            >
              –
            </button>
            <input
              type="number"
              v-model.number="selectedItem.qty"
              min="1"
              max="999"
              class="quantity-input"
            />
            <button
              type="button"
              class="qty-btn"
              @click="increase(selectedItem)"
            >
              +
            </button>
          </div>
        </div>

        <!-- Preço total -->
        <p class="mt-3 text-center fw-bold">
          Total: {{ selectedItem.price * selectedItem.qty }} BRL
          <span v-if="selectedItem.amount">
            (x{{ selectedItem.amount * selectedItem.qty }} unidades)</span
          >
        </p>

        <!-- Ações -->
        <div class="modal-actions">
          <button class="btn btn-outline-light" @click="closeModal">
            Fechar
          </button>
          <button class="btn btn-warning" @click="buy(selectedItem)">
            Comprar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";
import heroImg from "../assets/shop/shopRustbg.jpg";
import vipGold from "../assets/vips/vipgold.png";
import vipSilver from "../assets/vips/vipsilver.png";
import vipBronze from "../assets/vips/vipbronze.png";

// Carrega ícones
const icons = import.meta.glob("../assets/itens-rust/icons/*.webp", {
  eager: true,
});
const iconMap = {};
for (const path in icons) {
  const fileName = path.split("/").pop();
  iconMap[fileName] = icons[path].default;
}
function getIcon(name) {
  return iconMap[name] || null;
}

const categories = [
  { name: "all", label: "Todos os itens" },
  { name: "mostSelled", label: "Mais vendidos" },
  { name: "vip", label: "Kits VIP" },
  { name: "weapons", label: "Armas" },
  { name: "ammo", label: "Munição" },
  { name: "tools", label: "Ferramentas" },
  { name: "construction", label: "Construção" },
  { name: "resources", label: "Recursos" },
  { name: "medical", label: "Médico" },
  { name: "food", label: "Comida" },
  { name: "misc", label: "Vestuário" },
  { name: "traps", label: "Armadilhas" },
  { name: "eletrical", label: "Eletricidade" },
  { name: "vehiclesComponents", label: "Componentes de Veiculos" },
  { name: "other", label: "Outros" },
];

const currentCat = ref("all");
const searchTerm = ref("");

// ====== DADOS ======
const items = ref([
  {
    id: 1,
    name: "VIP Gold",
    price: 50,
    image: vipGold,
    description: "Kit completo para acelerar o início do wipe.",
    categories: ["vip"],
    kit: [
      { name: "AK-47", amount: 1, icon: getIcon("AK.webp") },
      {
        name: "5.56 Explosiva",
        amount: 128,
        icon: getIcon("5.56 EXPLOSIVA.webp"),
      },
    ],
  },
  {
    id: 2,
    name: "VIP Silver",
    price: 40,
    image: vipSilver,
    label: "Mais vendido",
    description: "Equilíbrio entre custo e performance.",
    categories: ["vip"],
    kit: [
      {
        name: "12 de Cano Duplo",
        amount: 1,
        icon: getIcon("12 DE CANO DUPLO.webp"),
      },
      { name: "5.56", amount: 64, icon: getIcon("5.56.webp") },
    ],
  },
  {
    id: 3,
    name: "VIP Bronze",
    price: 30,
    image: vipBronze,
    description: "Para começar com o pé direito.",
    categories: ["vip"],
    kit: [
      {
        name: "Guitarra",
        amount: 1,
        icon: getIcon("Acoustic_Guitar_icon.webp"),
      },
      {
        name: "12 Balote (Verde)",
        amount: 20,
        icon: getIcon("12 BALOTE (VERDE).webp"),
      },
    ],
  },

  // Balas em pacotes
  {
    id: 4,
    name: "Munição 5.56 de Alta",
    price: 10,
    amount: 128,
    image: getIcon("5.56 DE ALTA.webp"),
    description: "Pacote de 128 balas de alta velocidade.",
    categories: ["ammo"],
  },
  {
    id: 5,
    name: "Munição 5.56 Explosiva",
    price: 10,
    amount: 128,
    image: getIcon("5.56 EXPLOSIVA.webp"),
    description: "Pacote de 128 balas explosivas.",
    categories: ["ammo"],
  },
]);

// ====== FILTRO ======
const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const cats = Array.isArray(item.categories)
      ? item.categories
      : [item.category];
    const matchesCategory =
      currentCat.value === "all" || cats?.includes(currentCat.value);
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// ====== MODAL ======
const selectedItem = ref(null);

function openItem(item) {
  selectedItem.value = { ...item, qty: 1 };
}
function closeModal() {
  selectedItem.value = null;
}
function decrease(item) {
  if (!item.qty) item.qty = 1;
  if (item.qty > 1) item.qty--;
}
function increase(item) {
  if (!item.qty) item.qty = 1;
  if (item.qty < 999) item.qty++;
}
function buy(item) {
  const unidades = item.amount ? item.amount * item.qty : item.qty;
  alert(
    `Comprar: ${item.name} — ${item.qty} pacotes (${unidades} unidades) por ${
      item.price * item.qty
    } BRL`
  );
}
</script>

<style scoped>
/* ======= HERO ======= */
.hero {
  position: relative;
  min-height: 60vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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

/* ======= NAV CATEGORIAS + PESQUISA ======= */
.shop-nav,
.shop-search,
.shop-items {
  background-color: #0d0d0f;
  color: #fff;
}
/* categorias (teu estilo original) */
.shop-nav .nav {
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}
.shop-nav .nav-link {
  color: #fff;
  background: transparent;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 500;
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
.search-box {
  border-radius: 8px;
  padding: 0.6rem 1rem;
}

/* ======= GRID/CARDS ======= */
.shop-items .row {
  row-gap: 2rem;
}

.card {
  background: #1a1a1f;
  color: #fff;
  border: 1px solid #2b2b30;
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 18px rgba(242, 169, 0, 0.25);
}
.card-img-wrapper {
  position: relative;
  background: #0f0f12;
}
.card-img-top {
  height: 200px;
  object-fit: contain;
  padding: 10px;
  width: 100%;
}
.card-body {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.card-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

/* badges */
.badge.price {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: #f2a900;
  color: #0d0d0f;
  font-weight: 700;
  border-radius: 6px;
}
.badge.label {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #d78e00;
  font-weight: 600;
}

/* ======= MODAL ======= */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}
.modal-content {
  background: #1a1a1f;
  border: 1px solid #2b2b30;
  border-radius: 14px;
  padding: 1.5rem;
  max-width: 620px;
  width: 100%;
  color: #fff;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #0f0f12;
  color: #fff;
  border: 1px solid #2b2b30;
  font-size: 1.2rem;
  line-height: 1;
}
.modal-title {
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
}
.modal-media {
  display: flex;
  justify-content: center;
}
.modal-img {
  max-width: 320px;
  max-height: 320px;
  object-fit: contain;
  width: 100%;
}
.modal-desc {
  margin-top: 0.75rem;
  color: #c7c7c7;
}

/* vip kit */
.vip-kit-box {
  background: #141418;
  border: 1px solid #2b2b30;
  border-radius: 10px;
  padding: 0.75rem;
  margin-top: 1rem;
}
.vip-kit-title {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: #f2a900;
  font-weight: 700;
}
.kit-list {
  margin: 0;
  padding: 0;
}
.kit-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}
.kit-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

/* quantidade */
.quantity-wrapper {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}
.qty-label {
  color: #cfcfcf;
  font-size: 0.9rem;
}
.qty-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}
.quantity-input {
  width: 72px;
  height: 40px;
  text-align: center;
  border: 1px solid #2b2b30;
  border-radius: 8px;
  background: #0f0f12;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  -moz-appearance: textfield;
}
.quantity-input:focus {
  border-color: #f2a900;
  outline: none;
  box-shadow: 0 0 8px rgba(242, 169, 0, 0.45);
}
.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.qty-btn {
  width: 38px;
  height: 38px;
  background: #1a1a1f;
  border: 1px solid #2b2b30;
  border-radius: 8px;
  color: #f2a900;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.15s;
}
.qty-btn:hover {
  background: #f2a900;
  color: #0d0d0f;
}

/* ações do modal */
.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.25rem;
}
.btn-warning {
  background-color: #f2a900;
  border: none;
  font-weight: 700;
}
.btn-warning:hover {
  background-color: #d78e00;
  transform: translateY(-1px);
}
.btn-outline-light {
  border-color: #555;
}
.btn-outline-light:hover {
  background: #2a2a2a;
}

@media (min-width: 576px) {
  .modal-content {
    padding: 2rem;
  }
}
</style>
