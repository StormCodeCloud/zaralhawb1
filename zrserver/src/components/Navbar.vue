<script setup>
import { ref, onMounted } from "vue";

const steamUser = ref(null);

onMounted(() => {
  const saved = localStorage.getItem("steamUser");
  if (saved) {
    steamUser.value = JSON.parse(saved);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  document.querySelectorAll(".section").forEach(el => observer.observe(el));
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
    <div class="topbar d-flex justify-content-center align-items-center px-3">
      <div class="social-links d-flex flex-column align-items-center">
        <div class="connect-text">CONNECT WITH US</div>
        <div class="icons">
          <a href="https://discord.gg/jVDU97c9Xj" target="_blank"><i class="bi bi-discord"></i></a>
          <a href="https://steamcommunity.com/groups/zaralhaservers" target="_blank"><i class="bi bi-steam"></i></a>
          <a href="#" @click.prevent="handleClick('YouTube')"><i class="bi bi-youtube"></i></a>
        </div>
      </div>
    </div>

    <!-- Navbar principal -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center" href="/">
          <img src="../assets/navbar_logo.png" alt="Zaralha Servers Logo" class="navbar-logo me-2" />
        </a>

        <!-- Links + dropdown + login -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <a class="nav-link" href="/about">About Us</a>
            </li>

            <!-- Dropdown Servers -->
            <li class="nav-item ">
              <a class="nav-link " href="#" role="button" aria-expanded="false">
                Servers
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/shop">Shop</a>
            </li>
<<<<<<< HEAD
=======
            <li class="nav-item">
              <a class="nav-link" href="/services">Services</a>
            </li>
          </ul>
>>>>>>> 5033680bb45a1bdbf3df2d322a76d9b5b168f9ed

            <!-- Botão login -->
            <div class="d-flex ms-auto"> <a href="http://localhost:3000/auth/steam" class="btn btn-steam"> <i
                  class="bi bi-steam me-2"></i> Login via Steam </a> </div>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

html {
  scroll-behavior: smooth;
}

.section {
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease-out;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Topbar */
.topbar {
  background: #111;
  height: 60px;
  /* aumenta para caber texto + ícones */
}

.social-links {
  text-align: center;
}

.connect-text {
  font-size: 0.7rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 3px;
  /* espaço entre texto e ícones */
}

.icons a {
  margin: 0 6px;
  font-size: 1.2rem;
  color: #bbb;
  transition: color 0.3s;
}

.icons a:hover {
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
