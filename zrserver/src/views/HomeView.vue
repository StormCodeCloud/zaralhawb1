<template>
  <!-- Hero Section -->
  <section class="hero d-flex align-items-center justify-content-center"
    :style="{ backgroundImage: `url(${heroImg})` }">
    <div class="overlay"></div>
    <div class="hero-content text-center">
      <h1 class="hero-title">ZARALHA SERVERS</h1>
      <p class="hero-subtitle"> 
        Servidores seguros em Rust, Minecraft, Ark e DayZ
      </p>
    </div>
  </section>
  <ServersSection />
</template>

<script setup>
import Services from "@/views/ServicesView.vue"
import heroImg from "../assets/Rust-144.jpg";
import ServersSection from '../components/ServersSection.vue'
const servers = [
  { name: "Rust", slots: "86 / 200", ip: "rust.zaralha.gg:28015" },
  { name: "Minecraft", slots: "120 / 500", ip: "mc.zaralha.gg:25565" },
  { name: "Ark", slots: "65 / 150", ip: "ark.zaralha.gg:27015" },
  { name: "DayZ", slots: "30 / 80", ip: "dayz.zaralha.gg:2302" },
];
</script>

<style scoped>

@font-face {
  font-family: "thornton-k7eal";
  src: url("./assets/fonts/thornton-k7eal") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.home-dark {
  background: #0d0d0f;
  color: #fff;
}

.hero {
  position: relative;
  height: 60vh;
  background: url("/assets/hero-bg.jpg") center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero .overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
}

.hero-subtitle {
  font-family: "thornton-k7eal", cursive;
  font-size: 1.2rem;
  color: #f2a900;
  /* cor destaque */
}

.server-card {
  background: #1a1a1f;
  border: 1px solid #333;
  padding: 1.5rem;
  border-radius: 8px;
  transition: 0.3s;
}

.server-card:hover {
  border-color: #f2a900;
  box-shadow: 0 0 15px #f2a90055;
}

/* Hero */
.hero {
  position: relative;
  min-height: 60vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #0d0d0f;
  /* fallback se a imagem falhar */
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
</style>
