<!-- ServicesView.vue -->
<template>
  <!-- Secção Hero semelhante à Home -->
  <section class="hero d-flex align-items-center justify-content-center"
    :style="{ backgroundImage: `url(${heroImg})` }">
    <div class="overlay"></div>
    <div class="hero-content text-center">
      <h1 class="hero-title">Nossos Serviços</h1>
      <p class="hero-subtitle">
        Criação de mapas, cupões de desconto, venda e tradução de plugins
      </p>
    </div>
  </section>

  <!-- Secção de Serviços -->
  <section class="services-section container-fluid py-5">
    <div class="row gy-4 align-items-stretch justify-content-center">
      <div
        v-for="service in services"
        :key="service.title"
        class="col-12 col-md-6 col-lg-4 d-flex mb-4"
      >
        <div class="service-card flex-fill">
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
          <p v-if="service.price" class="service-price">
            {{ service.price }}
          </p>
          <a v-if="service.link" :href="service.link" class="btn btn-primary mt-auto" target="_blank">
            {{ service.buttonText || 'Saber mais' }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import heroImg from "../assets/services-hero.jpg"; // substitua por uma imagem adequada aos serviços

const services = [
  {
    title: "Criação de Mapas Rust",
    description: "Criamos mapas personalizados para Rust em qualquer versão; o cliente pode acompanhar o processo e definir monumentos, estradas e rios.",
    price: "Valor sob consulta"
  },
  {
    title: "Cupão de Desconto Hostinger",
    description: "Obtenha desconto exclusivo na hospedagem Hostinger usando o nosso cupão.",
    link: "https://www.hostinger.com/coupon-seu-cupom",
    buttonText: "Usar cupão"
  },
  {
    title: "Venda de Plugins",
    description: "Oferecemos plugins premium para servidores Rust, Minecraft, Ark e DayZ.",
    price: "Preços variados"
  },
  {
    title: "Tradução de Plugins",
    description: "Traduzimos plugins para português por um valor em reais ou euros. Consulte-nos para orçamentos.",
    price: "Sob consulta"
  },
];
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

.services-section {
  background-color: #0d0d0f;
  color: #fff;
}

.service-card {
  background: #1a1a1f;
  border: 1px solid #333;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
}

.service-card:hover {
  border-color: #f2a900;
  box-shadow: 0 0 15px #f2a90055;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.service-description {
  flex-grow: 1;
  color: #ccc;
}

.service-price {
  color: #f2a900;
  font-weight: 600;
}

.btn-primary {
  background-color: #f2a900;
  border-color: #f2a900;
  color: #0d0d0f;
  font-weight: 700;
}

.btn-primary:hover {
  background-color: #d78e00;
  border-color: #d78e00;
  color: #fff;
}
</style>
