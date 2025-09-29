<script setup>
const servers = [
  {
    name: "Rust 1000x",
    ip: "177.84.174.113:28015",
    slots: "0 / 100",
    desc: "PVP e muito mais!",
    status: "Online!"
  },
  {
    name: "Minecraft",
    ip: "177.84.174.113",
    slots: "0 / 20",
    desc: "Atualmente com o ATM2!",
    status: "Online!"
  },
  {
    name: "Ark - The Island",
    ip: "177.84.174.113:7777",
    slots: "0 / 70",
    desc: "Servidor PvE com mods.",
    status: "Online"
  },
  {
    name: "DayZ",
    ip: "IP ainda por definir.",
    slots: "0 / 80",
    desc: "O Mundo dos zumbies!",
    status: "Em Manutenção"
  }
]
</script>

<template>
  <section class="servers py-5">
    <div class="container">
      <h2 class="section-title text-center mb-5">Nossos Servidores</h2>
      <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-3" v-for="server in servers" :key="server.name">
          <div class="server-card h-100 text-center">
            <h5 class="server-name">{{ server.name }}</h5>
            <p class="server-ip">{{ server.ip }}</p>
            <p class="server-slots">{{ server.slots }}</p>
            <span class="badge server-status">{{ server.status }}</span>
            <p class="server-desc mt-2">{{ server.desc }}</p>
            <button class="btn btn-warning btn-sm fw-bold mt-3">Copiar IP</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.servers {
  background: #0d0d0f;
  color: #fff;
}
.section-title {
  font-weight: 900;
  text-transform: uppercase;
  color: #f2a900;
  letter-spacing: 1px;
}
.server-card {
  background: #1a1a1f;
  border: 1px solid #333;
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.server-card:hover {
  transform: translateY(-5px);
  border-color: #f2a900;
  box-shadow: 0 0 15px #f2a90055;
}
.server-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}
.server-ip {
  font-size: 0.9rem;
  color: #bbb;
}
.server-slots {
  font-size: 0.9rem;
  color: #bbb;
}
.server-status {
  background: #f2a900;
  color: #000;
  font-weight: 600;
  font-size: 0.8rem;
  border-radius: 5px;
}
.server-desc {
  font-size: 0.85rem;
  color: #aaa;
}
</style>
