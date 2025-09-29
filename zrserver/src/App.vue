<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const loading = ref(false);
const steamUser = ref(null);

const router = useRouter();

// loading antes e depois das rotas
router.beforeEach((to, from, next) => {
  loading.value = true;
  next();
});
router.afterEach(() => {
  setTimeout(() => (loading.value = false), 600);
});

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
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<style>
/* fundo padrão da aplicação */
#app,
.neon-grid {
  background-color: #0d0d0f;
  /* preto neon */
  min-height: 100vh;
}

/* fundo do router-view (quando vazio) */
router-view {
  display: block;
  background-color: #0d0d0f;
  min-height: 70vh;
}
</style>
