<template>
  <ServersSection />
</template>

<script setup>
import ServersSection from '../components/ServersSection.vue'
const servers = [
  { name: "Rust", slots: "86 / 200", ip: "rust.zaralha.gg:28015" },
  { name: "Minecraft", slots: "120 / 500", ip: "mc.zaralha.gg:25565" },
  { name: "Ark", slots: "65 / 150", ip: "ark.zaralha.gg:27015" },
  { name: "DayZ", slots: "30 / 80", ip: "dayz.zaralha.gg:2302" },
];
</script>

<style scoped>
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
  background: rgba(0,0,0,0.6);
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
  font-size: 1.2rem;
  color: #f2a900; /* cor destaque */
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
</style>
