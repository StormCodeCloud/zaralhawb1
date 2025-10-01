<script setup>
import { reactive } from "vue";
import loginBg from "@/assets/loginbg.jpg"; // 🔹 importa a imagem de fundo

const form = reactive({
  name: "",
  email: "",
  password: "",
  country: "",
});

const europeCountries = [
  "Alemanha","Áustria","Bélgica","Bulgária","Chipre","Croácia","Dinamarca","Eslováquia","Eslovênia",
  "Espanha","Estónia","Finlândia","França","Grécia","Hungria","Irlanda","Itália","Letónia","Lituânia",
  "Luxemburgo","Malta","Países Baixos","Polônia","Portugal","República Checa","Romênia","Suécia","Suíça",
  "Noruega","Islândia","Liechtenstein"
];

const southAmericaCountries = [
  "Argentina","Bolívia","Brasil","Chile","Colômbia","Equador","Guiana","Paraguai","Peru",
  "Suriname","Uruguai","Venezuela"
];

function submitForm() {
  alert(`Bem-vindo, ${form.name}! Você escolheu ${form.country}.`);
}

function copyForm() {
  navigator.clipboard.writeText(JSON.stringify(form, null, 2));
  alert("✅ Dados copiados para a área de transferência!");
}
</script>

<template>
  <div class="login-page d-flex justify-content-center align-items-center"
       :style="{ backgroundImage: `url(${loginBg})` }">
    <!-- 🔹 Overlay semi-transparente -->
    <div class="overlay"></div>

    <!-- 🔹 Conteúdo -->
    <div class="row login-container position-relative">
      <!-- Lado esquerdo (Formulário) -->
      <div class="col-md-6">
        <div class="card shadow-lg login-card">
          <div class="card-header bg-warning text-dark fw-bold d-flex justify-content-between align-items-center">
            <span>Login / Registro</span>
            <img src="@/assets/navbar_logo.png" alt="Logo" class="logo-img" />
          </div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="name" class="form-label">Nome</label>
                <input v-model="form.name" type="text" class="form-control custom-input" id="name" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control custom-input" id="email" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="form.password" type="password" class="form-control custom-input" id="password" required />
              </div>
              <div class="mb-4">
                <label for="country" class="form-label">País de Origem</label>
                <select v-model="form.country" id="country" class="form-select custom-input" required>
                  <option value="" disabled>Selecione um país</option>
                  <optgroup label="Europa">
                    <option v-for="c in europeCountries" :key="c" :value="c">{{ c }}</option>
                  </optgroup>
                  <optgroup label="América do Sul">
                    <option v-for="c in southAmericaCountries" :key="c" :value="c">{{ c }}</option>
                  </optgroup>
                </select>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-warning fw-bold">Entrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Lado direito (Debug + Aviso) -->
      <div class="col-md-6 d-flex flex-column align-items-center">
        <pre class="debug-box mb-3">{{ form }}</pre>
        <div class="alert alert-warning d-flex justify-content-between align-items-center w-100 max-box">
          <span>⚠️ Guarde esta informação para nunca perder o login</span>
          <button class="btn btn-sm btn-outline-dark" @click="copyForm">Copiar Dados</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  flex-direction: column;
  padding: 20px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

/* 🔹 Overlay translúcido */
.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7); /* 50% escuro */
  z-index: 1;
}

.login-container {
  position: relative;
  z-index: 2; /* conteúdo acima do overlay */
  width: 100%;
  max-width: 1000px;
}

.login-card {
  border-radius: 15px;
  overflow: hidden;
}

.custom-input {
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  position: relative;
  
}
.custom-input:focus {
  border-color: #f2a900;
  box-shadow: 0 0 6px rgba(242, 169, 0, 0, 0.6);
}

/* Debug estilo terminal */
.debug-box {
  width: 100%;
  max-width: 450px;
  background: #1e1e1e;
  color: #00ff00;
  font-family: monospace;
  font-size: 0.85rem;
  border-radius: 8px;
  padding: 12px;
  white-space: pre-wrap;
}

.max-box {
  max-width: 450px;
}

.logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
