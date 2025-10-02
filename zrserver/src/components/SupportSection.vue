<template>
  <section class="support-section">
    <div class="support-content">
      <h3><span class="icon">✔</span> SUPPORT OUR WORK</h3>
      <p>
        Servers don’t grow on trees, help us out by getting cool perks from our store! 
        Skip long queues or boost your rank and other benefits that takes the hassle out of the game.
      </p>
      <button class="upgrade-btn">⬆ UPGRADE AT OUR STORE TODAY</button>
    </div>

    <div class="support-image">
      <img src="../assets/rust/rust-soldier.png" alt="Rust Character" />
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>
.support-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  padding: 2rem;
  margin-top: 2rem;
}
.support-content {
  max-width: 50%;
  color: white;
}
.support-content h3 {
  font-weight: bold;
  margin-bottom: 1rem;
}
.upgrade-btn {
  background: #f7d400;
  border: none;
  padding: 0.8rem 1.5rem;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: bold;
}
.support-image img {
  max-height: 250px;
}
</style>
