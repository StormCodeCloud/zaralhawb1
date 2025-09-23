<script setup>
import heroImg from "../assets/Rust-144.jpg"; // troca pelo nome da tua imagem
import navbarLogo from "../assets/navbar_logo.png";
</script>

<template>
  <header>
    <!-- Topbar -->
    <div class="topbar d-flex justify-content-between align-items-center px-3">
      <div class="social-links">
        <a href="https://discord.gg/zaralha" target="_blank"
          ><i class="bi bi-discord"></i
        ></a>
        <a href="https://store.steampowered.com/" target="_blank"
          ><i class="bi bi-steam"></i
        ></a>
        <a href="https://www.youtube.com/" target="_blank"
          ><i class="bi bi-youtube"></i
        ></a>
      </div>
      <div class="top-actions">
        <a href="/login" class="text-light small">Login via Steam</a>
      </div>
    </div>

    <!-- Navbar principal -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center" href="/">
          <img
            src="../assets/navbar_logo.png"
            alt="Zaralha Servers Logo"
            class="navbar-logo me-2"
          />
        </a>

        <!-- Botão hamburguer -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <a class="nav-link" href="/about">About Us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/discord">Discord</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/servers">Servers</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/shop">Shop</a>
            </li>
            <li class="nav-item ms-2">
              <a class="btn btn-warning btn-sm fw-bold px-3" href="/login"
                >Login</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section
      class="hero d-flex align-items-center justify-content-center"
      :style="{ backgroundImage: `url(${heroImg})` }"
    >
      <div class="overlay"></div>
      <div class="hero-content text-center">
        <h1 class="hero-title">ZARALHA SERVERS</h1>
        <p class="hero-subtitle">
          Servidores seguros em Rust, Minecraft, Ark e DayZ
        </p>
      </div>
    </section>
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

/* Hero */
.hero {
  position: relative;
  min-height: 60vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #0d0d0f; /* fallback se a imagem falhar */
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

.navbar-logo {
  height: 80px; /* ajusta o tamanho do logo */
  width: auto;
}

</style>
