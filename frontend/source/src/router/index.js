import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import views from '../views'
import Home from '../views/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // without Home
  ...views.filter(v => v.name != "Home")
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
