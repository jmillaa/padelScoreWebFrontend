<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps(['id'])
const router = useRouter()

const puntos = ref(['0', '0'])
const juegos = ref(['0', '0'])
const sets = ref(['0', '0'])
const error = ref(null)

const urlServidor = 'https://padelscore-web-server.onrender.com'

function retroceder() {
  router.push('/')
}

async function cargarMarcador() {
  try {
    const response = await axios.get(`${urlServidor}/partido/${props.id}`)
    const marcador = response.data.marcador

    puntos.value = marcador.puntos.map(p => p.toString())
    juegos.value = marcador.juegosSetActual
    sets.value = marcador.setsGanados
    error.value = null
  } catch (err) {
    console.error('Error al cargar marcador:', err)
    error.value = 'No se pudo cargar el marcador. Comprueba el ID.'
  }
}

onMounted(() => {
  cargarMarcador()
  setInterval(cargarMarcador, 5000)
})
</script>

<template>
  <div class="h-screen bg-[#383535] text-white flex flex-col items-center justify-center px-4 py-8">
    <!-- Título -->
    <h1 class="text-5xl font-bold mb-12 text-center">
      <span class="text-white">PADEL</span><span class="text-[#5ADF14]">SCORE</span>
    </h1>

    <!-- Info de partido -->
    <p class="flex items-center gap-2 text-sm font-semibold uppercase text-white mb-2">
      <span class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      Partido en directo
    </p>
    <p class="text-sm text-gray-400 mb-4">ID del partido: {{ id }}</p>

    <!-- Mensaje de error -->
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <!-- Marcador principal -->
    <div v-if="!error" class="flex justify-center items-end gap-8 mb-6 text-center">
      <div>
        <p class="text-blue-400 font-semibold text-lg">Equipo 1</p>
        <p class="text-6xl font-bold">{{ puntos[0] }}</p>
      </div>
      <p class="text-5xl font-bold">-</p>
      <div>
        <p class="text-red-400 font-semibold text-lg">Equipo 2</p>
        <p class="text-6xl font-bold">{{ puntos[1] }}</p>
      </div>
    </div>

    <!-- Tabla de sets y juegos -->
    <div v-if="!error" class="bg-[#4a4a4a] rounded-xl px-6 py-4">
      <table class="text-sm text-center w-full">
        <thead>
          <tr class="text-gray-300">
            <th class="px-4">PUNTOS</th>
            <th class="px-4">SETS</th>
            <th class="px-4">JUEGOS</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-blue-400 font-semibold">
            <td class="py-1">{{ puntos[0] }}</td>
            <td>{{ sets[0] }}</td>
            <td>{{ juegos[0] }}</td>
          </tr>
          <tr class="text-red-400 font-semibold">
            <td class="py-1">{{ puntos[1] }}</td>
            <td>{{ sets[1] }}</td>
            <td>{{ juegos[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Botón volver -->
    <button
      v-if="!error"
      @click="retroceder"
      class="justify-center mt-8 text-white font-semibold bg-[#534E4E] px-4 py-2 rounded-full hover:bg-[#5ADF14]"
    >
      Inicio
    </button>

    <!-- Botón volver si hay error -->
    <button
      v-if="error"
      @click="retroceder"
      class="mt-4 text-white font-semibold bg-[#534E4E] px-4 py-2 rounded-full hover:bg-[#5ADF14]"
    >
      Volver al inicio
    </button>
  </div>
</template>

<style>
</style>
