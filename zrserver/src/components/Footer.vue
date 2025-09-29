<script setup>
function handleClick(platform) {
    alert(`Ainda não temos conta no ${platform}. Em breve estará disponível!`);
}
</script>

<template>
    <footer class="custom-footer py-4">
        <div class="container text-center">
            <!-- Logo -->
            <div class="footer-logo mb-3">
                <img src="../assets/navbar_logo.png" alt="Zaralha Logo" class="footer-img" />
            </div>

            <!-- Links -->
            <ul class="footer-nav list-inline mb-3">
                <li class="list-inline-item"><a href="/home">Home</a></li>
                <li class="list-inline-item"><a href="/about">About us</a></li>
                <li class="list-inline-item"><a href="/shop">Shop</a></li>
                <li class="list-inline-item"><a href="/servers">Servers</a></li>

            </ul>

            <!-- Social -->
            <div class="footer-social mb-3">
                <a href="https://discord.gg/jVDU97c9Xj" target="_blank"><i class="bi bi-discord"></i></a>
                <!-- TikTok ainda não existe -->
                <a href="#" @click.prevent="handleClick('TikTok')"><i class="bi bi-tiktok"></i></a>
                <a href="https://twitter.com/" @click.prevent="handleClick('Twitter')" target="_blank"><i
                        class="bi bi-twitter"></i></a>
                <a href="https://youtube.com/" @click.prevent="handleClick('YouTube')" target="_blank"><i
                        class="bi bi-youtube"></i></a>
            </div>

            <!-- Direitos -->
            <p class="footer-copy mb-0">
                © 2024 Zaralha Servers. Todos os direitos reservados.
            </p>
        </div>
    </footer>
</template>

<style scoped>
.custom-footer {
    background: #111;
    border-top: 2px solid #f2a900;
    color: #bbb;
    font-size: 0.9rem;
}

.footer-logo img.footer-img {
    height: 100px;
    filter: brightness(1.2);
}

.footer-nav a {
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 0 10px;
    transition: color 0.3s;
}

.footer-nav a:hover {
    color: #f2a900;
}

.footer-social a {
    color: #bbb;
    font-size: 1.3rem;
    margin: 0 8px;
    transition: color 0.3s;
}

.footer-social a:hover {
    color: #f2a900;
}

.footer-copy {
    font-size: 0.8rem;
    color: #777;
    margin-top: 10px;
}
</style>
