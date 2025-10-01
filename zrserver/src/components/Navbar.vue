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
  window.location.href = "/";
}

function handleClick(platform) {
  alert(`Ainda não temos conta no ${platform}. Em breve estará disponível!`);
}
</script>

<template>
  <header>
    <!-- 🔹 Topbar -->
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

    <!-- 🔹 Navbar principal -->
    <nav class="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div class="container-fluid">
        <!-- Logo -->
        <router-link class="navbar-brand d-flex align-items-center" to="/">
          <img src="../assets/navbar_logo.png" alt="Zaralha Servers Logo" class="navbar-logo me-2" />
        </router-link>

        <!-- Botão toggle (mobile) -->
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

        <!-- Links + Login -->
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav align-items-center">
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/servers">Servers</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/shop">Shop</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/services">Services</router-link>
            </li>
          </ul>

          <!-- 🔹 Área login no canto direito -->
          <div class="d-flex ms-auto align-items-center">
            <!-- Se NÃO está logado -->
            <router-link v-if="!steamUser" to="/login" class="login-btn">
              <i class="bi bi-box-arrow-in-right me-1"></i> Login
            </router-link>

            <!-- Se está logado -->
            <div v-else class="d-flex align-items-center">
              <img :src="steamUser.avatar" alt="avatar" class="user-avatar me-2" />
              <span class="me-2">{{ steamUser.name }}</span>
              <button class="btn btn-sm btn-warning" @click="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

/* Topbar */
.topbar {
  background: #111;
  height: 60px;
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
  width: auto;
}

/* Avatar Steam */
.user-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f2a900;
}

/* Botão login */
.login-btn {
  color: #f2a900;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 5px;
  transition: 0.3s;
  text-decoration: none;
}

.login-btn:hover {
  background-color: #171a21;
  color: #fff;
}
</style>
