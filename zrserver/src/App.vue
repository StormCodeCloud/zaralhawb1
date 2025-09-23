<script setup>
import Navbar from './components/Navbar.vue'
import 'bootstrap/dist/css/bootstrap.css'
import Footer from "./components/Footer.vue";
import { ref, onMounted } from "vue";

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("user")) {
    const user = JSON.parse(params.get("user"));
    localStorage.setItem("steamUser", JSON.stringify(user));
    console.log("Logado com:", user);
  }
});

const steamUser = ref(null);

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.has("user")) {
    const user = JSON.parse(params.get("user"));
    localStorage.setItem("steamUser", JSON.stringify(user));
    steamUser.value = user;

    // remove ?user=... da URL
    window.history.replaceState({}, document.title, window.location.pathname);
  } else {
    const saved = localStorage.getItem("steamUser");
    if (saved) {
      steamUser.value = JSON.parse(saved);
    }
  }
});

</script>

<template>
  <div id="app" class="neon-grid">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>
