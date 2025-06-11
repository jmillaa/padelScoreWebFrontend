<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const id = route.query.id
const error = ref(null)
const puntos = ref(['0', '0'])
const juegos = ref(['0', '0'])
const sets = ref(['0', '0'])

const urlServidor = 'https://padelscore-web-server.onrender.com'

async function cargarMarcador() {
  try {
    const response = await axios.get(`${urlServidor}/partido/${id}`)
    if (!response.data || !response.data.marcador) {
      throw new Error('Partido no encontrado')
    }

    const marcador = response.data.marcador
    puntos.value = marcador.puntos.map(p => p.toString())
    juegos.value = marcador.juegosSetActual
    sets.value = marcador.setsGanados
    error.value = null
  } catch (err) {
    console.error(err)
    error.value = 'No se encontró ningún partido con ese ID.'
  }
}

onMounted(() => {
  cargarMarcador()
})
</script>

<template>
  <div class="text-white">
    <h1 class="text-3xl font-bold">Panel de Árbitro</h1>

    <div v-if="error" class="text-red-400 mt-4">
      {{ error }}
    </div>

    <div v-else>
      <!-- aquí va tu formulario o controles para editar el marcador -->
    </div>
  </div>
</template>
