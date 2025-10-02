<template>
  <section class="featured-video">
    <h2 class="section-title">Somos uma das melhores comunidades de Rust Pirata da atualidade!</h2>
    <p class="section-subtitle">
      Composta por uma equipa focada em segurança e encripatação de dados, nós temos um dos servidores mais seguros do Rust Pirata! 
      Nossa equipa está on 10/15h por dia.
      Se procura servidores seguros e com variedade de eventos, você veio ao sitios certo!
    </p>

    <div class="video-container">
      <iframe 
        width="560" 
        height="315"
        src="https://www.youtube.com/watch?v=whgxAwKJnVg" 
        title="Vital Rust 2.0 Update" 
        frameborder="0" 
        allowfullscreen>
      </iframe>

      <div class="video-info">
        <h3>Zaralha Streamers</h3>
        <p>
            Bebe Tv é um dos nossos leais streamers que cria conteudo para o nosso servidor.
            Faz videos de inicio de wipe como também jogando com a sua equipa!
        </p>
        <p class="featured-link">Video feito por: <span>Bebe Tv</span></p>
      </div>
    </div>
  </section>
</template>

<script setup>
// sem lógica ainda, apenas apresentação
</script>

<style scoped>
.featured-video {
  color: white;
  padding: 2rem;
}
.section-title {
  font-size: 2rem;
  font-weight: bold;
}
.section-subtitle {
  margin-bottom: 1.5rem;
  color: #ccc;
}
.video-container {
  display: flex;
  gap: 1.5rem;
}
.video-info {
  background: rgba(0,0,0,0.6);
  padding: 1rem;
  border-left: 3px solid #f7d400;
}
.featured-link span {
  color: #ff0077;
  font-weight: bold;
}
</style>
