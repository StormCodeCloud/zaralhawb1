<script setup>
import { ref, onMounted } from "vue";

const steamUser = ref(null);

onMounted(() => {
  const saved = localStorage.getItem("steamUser");
  if (saved) {
    steamUser.value = JSON.parse(saved);
  }
});

function logout() {
  localStorage.removeItem("steamUser");
  steamUser.value = null;
  window.location.href = "/"; // refresh
}

function handleClick(platform) {
  alert(`Ainda não temos conta no ${platform}. Em breve estará disponível!`);
}
</script>

<template>
  <header>
    <!-- Topbar -->
    <div class="topbar d-flex justify-content-between align-items-center px-3">
      <div class="social-links">
        <a href="https://discord.gg/jVDU97c9Xj" target="_blank"><i class="bi bi-discord"></i></a>
        <a href="https://store.steampowered.com/" target="_blank"><i class="bi bi-steam"></i></a>
        <a href="#" @click.prevent="handleClick('YouTube')" target="_blank"><i class="bi bi-youtube"></i></a>
      </div>
    </div>

    <!-- Navbar principal -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center" href="/">
          <img src="../assets/navbar_logo.png" alt="Zaralha Servers Logo" class="navbar-logo me-2" />
        </a>

        <!-- Botão hamburguer -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <a class="nav-link" href="/about">About Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/servers">Servers</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/shop">Shop</a>
            </li>
          </ul>

          <!-- Botão login -->
          <div class="d-flex ms-auto">
            <a href="http://localhost:3000/auth/steam" class="btn btn-steam">
              <i class="bi bi-steam me-2"></i> Login via Steam
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* Topbar */
.topbar {
  background: #111;
  height: 35px;
  font-size: 0.9rem;
}

.social-links a {
  color: #bbb;
  margin-right: 1rem;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #f2a900;
}

.top-actions a {
  color: #bbb;
  text-decoration: none;
}

.top-actions a:hover {
  color: #f2a900;
}

/* Navbar */
.custom-navbar {
  background-color: #0d0d0f;
  border-bottom: 2px solid #f2a900;
}

.navbar-brand {
  font-size: 1.3rem;
  letter-spacing: 1px;
}

.navbar-nav .nav-link {
  color: #fff;
  font-weight: 600;
  margin-left: 1rem;
  text-transform: uppercase;
  transition: color 0.3s, border-bottom 0.3s;
}

.navbar-nav .nav-link:hover {
  color: #f2a900;
  border-bottom: 2px solid #f2a900;
}

.btn-warning {
  background-color: #f2a900;
  border: none;
}

.btn-warning:hover {
  background-color: #ffb700;
}

.navbar-logo {
  height: 80px;
  /* ajusta o tamanho do logo */
  width: auto;
}

.btn-steam {
  color: #fff;
  transition: 0.3s;
}
</style>
