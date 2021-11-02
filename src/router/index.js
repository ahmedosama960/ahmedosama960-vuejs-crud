import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import addproduct from "../views/addproduct.vue";
import updateproduct from '../views/updateproduct.vue';
import deleteproduct from '../views/deleteproduct.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/product/add",
    name: "product.add",
    component: addproduct,
  },
  {
    path: "/product/edit/:id",
    name: "product.edit",
    component: updateproduct,
    props:true
  },
  {
    path: "/product/delete/:id",
    name: "product.delete",
    component: deleteproduct,
    props:true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
