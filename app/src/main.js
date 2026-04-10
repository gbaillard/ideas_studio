import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import IdeaDetail from './views/IdeaDetail.vue'
import './style.css'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/idea/:id', component: IdeaDetail, props: route => ({ id: Number(route.params.id) }) },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
