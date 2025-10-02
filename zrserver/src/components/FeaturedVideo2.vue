<template>
  <section class="featured-video-2">
    <!-- Imagem ou Vídeo -->
    <div class="video-container">
      <img src="../assets/rust/raid-cam.png" alt="Raid Cam Screenshot" />
    </div>

    <!-- Conteúdo da direita (Card com cantos amarelos) -->
    <div class="video-info">
      <h3>VITAL RAID CAM VIDEO</h3>
      <p>
        Luiz Arauja é um dos nossos admins que fica gravando todo o tipo
        de pvp que acontece em monumentos e raids ao longo do mapa!
      </p>
      <a 
        href="https://www.youtube.com/watch?v=3Qu6qVXpD2o" 
        target="_blank" 
        class="yt-btn"
      >
        <i class="bi bi-youtube"></i> Confere o video ai!
      </a>
    </div>
  </section>
</template>

<script setup>
// Apenas apresentação visual
</script>

<style scoped>
.featured-video-2 {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: #000;
  color: white;
}

/* Imagem */
.video-container img {
  max-width: 500px;
  border: 3px solid #f7d400;
}

/* Card estilo Vital */
.video-info {
  position: relative;
  left: 5rem;
  background: rgba(0, 0, 0, 0.85);
  padding: 1.5rem;
  flex: 1;
  max-width: 600px;
}

/* Cantos amarelos */
.video-info::before,
.video-info::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  border: 3px solid #f7d400;
}

.video-info::before {
  top: -3px;
  left: -3px;
  border-right: none;
  border-bottom: none;
}

.video-info::after {
  bottom: -3px;
  right: -3px;
  border-left: none;
  border-top: none;
}

.video-info h3 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.video-info p {
  color: #ccc;
  margin-bottom: 1.5rem;
}

/* Botão YouTube */
.yt-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1c1c1c;
  border: 1px solid #333;
  padding: 0.8rem 1.2rem;
  text-decoration: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  transition: 0.3s;
}

.yt-btn i {
  font-size: 1.2rem;
  color: #ff0000;
}

.yt-btn:hover {
  background: #ff0000;
  border-color: #ff0000;
  color: #fff;
}

.featured-player .label {
  font-size: 0.8rem;
  color: #bbb;
  margin: 0;
}

.featured-player .player-name {
  margin: 0;
  color: #ff0077;
  font-weight: bold;
}

.featured-player .highlight {
  display: block;
  font-weight: bold;
  color: #f7d400;
}
</style>
