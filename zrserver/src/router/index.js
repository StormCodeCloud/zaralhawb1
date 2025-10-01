import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ShopView from "@/views/ShopView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from '@/views/LoginView.vue';
import ServersSection from "@/components/ServersSection.vue";
import Services from "@/views/ServicesView.vue";
import shopDayZ from "@/views/ShopDZView.vue";
import shopRust from "@/views/ShopRuView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  { path: "/shop", component: ShopView },
  { path: "/register", component: RegisterView },
  { path: "/login", component: LoginView},
  { path: "/servers", component: ServersSection},
  {path: "/services", component: Services},
  {path: "/shopDZ", component: shopDayZ},
  {path: "/shopRU", component: shopRust}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
