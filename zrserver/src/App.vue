<script setup>
import Navbar from './components/Navbar.vue'
// Only import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'
</script>

<template>
  <Navbar />
  <router-view />
</template>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
</style>