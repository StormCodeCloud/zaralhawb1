import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ServersView from "@/views/ServersView.vue";
import ShopView from "@/views/ShopView.vue";
import RegisterView from "@/views/RegisterView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  { path: "/servers", component: ServersView },
  //{ path: "/shop", component: ShopView },
  { path: "/register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
