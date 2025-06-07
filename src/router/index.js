import { createRouter, createWebHistory } from 'vue-router'
import PantallaInicio from '../components/PantallaInicio.vue'
import Marcador from '../components/Marcador.vue'

const routes = [
  { path: '/', component: PantallaInicio },
  { path: '/partido/:id', component: Marcador, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
