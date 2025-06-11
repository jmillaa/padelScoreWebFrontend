import { createRouter, createWebHistory } from 'vue-router'
import PantallaInicio from '../components/PantallaInicio.vue'
import Marcador from '../components/Marcador.vue'
import LoginArbitro from '../components/LoginArbitro.vue'
import PanelArbitro from '../components/PanelArbitro.vue'

const routes = [
  { path: '/', component: PantallaInicio },
  { path: '/partido/:id', component: Marcador, props: true },
  { path: '/login-arbitro', component: LoginArbitro },
  { path: '/panel-arbitro', component: PanelArbitro, props: route => ({ id: route.query.id }) },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
