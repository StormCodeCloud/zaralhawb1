<script setup>
import heroGif from "../assets/aboutbg.png";
</script>

<template>
    <!-- Hero Section -->
    <section class="hero d-flex align-items-center justify-content-center"
        :style="{ backgroundImage: `url(${heroGif})` }">
        <div class="overlay"></div>
        <div class="hero-content text-center">
            <h1 class="hero-title">ZARALHA SERVERS</h1>
            <p class="hero-subtitle">
                Onde o foco é segurança, estabilidade e diversão!
            </p>
        </div>
    </section>

    <!-- About Section -->
    <section class="about py-5">
        <div class="container">
            <h2 class="section-title text-center mb-5">Sobre a Comunidade</h2>

            <div class="about-card mx-auto p-4">
                <p class="about-text">
                    A <span class="highlight">Zaralha Servers</span> foi criada em
                    <strong>7 de março de 2024</strong> e é gerida por dois owners:
                </p>

                <ul class="about-list">
                    <li>
                        <span class="highlight">Storm</span> – Português, programa e cria
                        websites e configura de switches/routers.
                    </li>
                    <li>
                        <span class="highlight">Arao</span> – Brasileiro, programador e
                        configurador de VPS para servidores de jogos.
                    </li>
                </ul>

                <p class="about-text mt-3">
                    O primeiro servidor criado foi no
                    <strong>Rust versão 2275</strong>, e desde então a comunidade tem
                    evoluído bastante.
                </p>

                <p class="about-text">
                    Atualmente contamos com mais de
                    <strong>400 jogadores no Discord</strong> e mais de
                    <strong>1000 jogadores</strong> que já passaram pelos nossos
                    servidores.
                </p>

                <p class="about-text">
                    Nosso objetivo é continuar crescendo, oferecendo servidores estáveis,
                    seguros e desenvolvidos com dedicação para a comunidade gamer.
                </p>
                <p class="about-text">
                    Somos uma comunidade focada em proporcionar a melhor experiência de jogo
                    possível, com servidores otimizados e um ambiente amigável para todos os
                    jogadores.
                </p>
                <p class="about-text">
                    <strong>Se procuras um lugar para jogar e fazer parte de uma comunidade em
                        crescimento, o Zaralha é o lugar certo para ti!</strong>
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Hero */
.hero {
    position: relative;
    min-height: 60vh;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #0d0d0f;
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

.hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    /* 0.8 = 80% preto transparente */
    z-index: 0;
}

.hero-content {
    position: relative;
    z-index: 1;
    /* garante que o texto fica acima */
}


/* About */
.about {
    background: #0d0d0f;
    color: #fff;
}

.section-title {
    font-weight: 900;
    text-transform: uppercase;
    color: #f2a900;
    letter-spacing: 1px;
}

.about-card {
    background: #1a1a1f;
    border: 1px solid #333;
    border-radius: 8px;
    max-width: 800px;
    line-height: 1.7;
    box-shadow: 0 0 15px rgba(242, 169, 0, 0.2);
}

.about-text {
    font-size: 1rem;
    color: #ddd;
}

.about-list {
    margin-top: 1rem;
    padding-left: 1.2rem;
}

.about-list li {
    margin-bottom: 0.5rem;
}

.highlight {
    color: #f2a900;
    font-weight: 600;
}
</style>
