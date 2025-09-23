<script setup>
import Navbar from './components/Navbar.vue'
import 'bootstrap/dist/css/bootstrap.css'
</script>

<template>
  <div id="app" class="neon-grid">
    <Navbar />
    <router-view />
  </div>
</template>


