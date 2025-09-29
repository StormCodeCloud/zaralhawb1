# Zaralha Servers [BR]

Projeto web para gerenciamento e divulgação dos servidores Zaralha (Rust, Minecraft, Ark, DayZ), com área de downloads de launchers, integração futura com Steam, e layout responsivo usando Vue 3 + Vite + Bootstrap.

---

## 📦 Tecnologias Utilizadas

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Animate.css](https://animate.style/)
- SVG customizado para loading

---

## 🗂️ Estrutura do Projeto

```
zrserver/
├── src/
│   ├── assets/                # Imagens, logos, SVGs
│   ├── components/            # Componentes globais (Navbar, Footer, LoadingSpinner)
│   ├── views/                 # Páginas principais (HomeView, ServersView, LoginView, etc)
│   ├── router/                # Configuração das rotas
│   ├── App.vue                # Componente raiz
│   ├── main.js                # Bootstrap do app
├── index.html                 # HTML principal
```

---

## 📝 Funcionalidades Implementadas

### 1. **Layout Responsivo**

- Navbar fixa no topo, com logo, links e botão de login à direita.
- Footer simples em todas as páginas.
- Uso de Bootstrap para responsividade e visual moderno.

### 2. **Navegação por Rotas**

- Configuração do Vue Router para navegação entre Home, About, Servers, Shop, Register, Login, etc.
- Rotas organizadas em `src/router/index.js`.

### 3. **Página Home**

- Hero section com imagem de fundo, título e subtítulo customizados.
- Cards apresentando os servidores (Rust, Minecraft, Ark, DayZ) com IP fictício e status "Em Manutenção".
- Estilo customizado para destaque dos cards e hero.

### 4. **Página Servers (Downloads)**

- Cards para cada launcher disponível (Rust, DayZ, Ark via Steam, Minecraft via TLauncher).
- Botão de download com SVG animado.
- Informações sobre segurança e atualizações dos launchers.
- Links para Discord para suporte.

### 5. **Página Login e Register**

- Formulários centralizados, estilizados apenas com classes Bootstrap.
- Campos para email, senha, confirmação de senha, checkbox e links para alternar entre login/register.

### 6. **Navbar**

- Logo à esquerda.
- Links de navegação centralizados/direita.
- Botão de login destacado no canto direito.
- Ícones sociais no topo (Discord, Steam, YouTube) com alerta para plataformas não disponíveis.
- Simulação de login Steam (mock) e avatar do usuário quando logado.

### 7. **Loading Entre Troca de Views**

- Componente `LoadingSpinner.vue` com SVG animado.
- Overlay escuro translúcido durante carregamento de rotas.
- Lógica de loading usando `router.beforeEach` e `router.afterEach` no `App.vue`.

### 8. **Estilo Customizado**

- Cores neon e dark para identidade visual.
- Hover e transições nos links da navbar.
- Cards com sombra, borda colorida e destaque no hover.
- Avatar Steam com borda personalizada.
- Botão de login com cor e efeito hover.

---

## 🛠️ Como Rodar o Projeto

1. Instale as dependências:
   ```
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
3. Acesse em [http://localhost:5173](http://localhost:5173)

---

## 🚧 TODO / Próximos Passos

- [ ] Integração real com Steam OpenID para login.
- [ ] Sistema de autenticação e registro de usuários.
- [ ] Painel administrativo para gerenciamento dos servidores.
- [ ] Página de perfil do usuário.
- [ ] Melhorar animações e feedback visual.
- [ ] Adicionar testes unitários.
- [ ] Internacionalização (i18n) para suporte a múltiplos idiomas.
- [ ] Deploy em ambiente de produção.

---

## 👨‍💻 Créditos

- Projeto desenvolvido por Zaralha Servers Team.
- SVG de loading gerado por [loading.io](https://loading.io/).
- Ícones por [Bootstrap Icons](https://icons.getbootstrap.com/).

---

## 📄 Licença

ESTE SITE FOI FEITO POR STORM (GIT: STORM CODE CLOUD). OPEN SOURCE COM DIREITO AUTORAIS.
