<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const id = route.query.id

const puntos = ref(['0', '0'])
const juegos = ref(['0', '0'])
const sets = ref(['0', '0'])
const error = ref(null)

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

async function guardarCambios() {
  const esTiebreak = Number(juegos.value[0]) === 6 && Number(juegos.value[1]) === 6
  const puntosValidosNormales = ['0', '15', '30', '40', 'AD']
  const puntosValidosTiebreak = Array.from({ length: 21 }, (_, i) => i.toString())

  const puntosA = puntos.value[0].toString()
  const puntosB = puntos.value[1].toString()

  const puntosSonValidos = esTiebreak
    ? puntosValidosTiebreak.includes(puntosA) && puntosValidosTiebreak.includes(puntosB)
    : puntosValidosNormales.includes(puntosA) && puntosValidosNormales.includes(puntosB)

  if (!puntosSonValidos) {
    alert(
      `Puntos inválidos. ${
        esTiebreak
          ? 'En tiebreak solo se permiten números del 0 al 20.'
          : 'Solo se permiten: 0, 15, 30, 40, AD'
      }`
    )
    return
  }

  try {
    const payload = {
      marcador: {
        puntos: [puntosA, puntosB],
        juegosSetActual: juegos.value,
        setsGanados: sets.value
      }
    }

    await axios.put(`${urlServidor}/partido/${id}`, payload)
    alert('Marcador actualizado correctamente')
  } catch (err) {
    console.error(err)
    alert('Error al guardar el marcador')
  }
}



onMounted(() => {
  const estaLogeado = sessionStorage.getItem('arbitroLogeado') === 'true'
  if (!estaLogeado) {
    window.location.href = `/login-arbitro?id=${id}`
  } else {
    cargarMarcador()
    setInterval(cargarMarcador, 15000)
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#383535] text-white flex flex-col items-center justify-center px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Panel de Árbitro</h1>

    <div v-if="error" class="text-red-400 mt-4">
      {{ error }}
    </div>

    <div v-else class="w-full max-w-md flex flex-col gap-4">
      <!-- Puntos -->
      <div class="flex justify-between items-center">
        <label>Puntos Equipo 1:</label>
        <input v-model="puntos[0]" class="text-black px-2 py-1 rounded w-24" />
      </div>
      <div class="flex justify-between items-center">
        <label>Puntos Equipo 2:</label>
        <input v-model="puntos[1]" class="text-black px-2 py-1 rounded w-24" />
      </div>

      <!-- Juegos -->
      <div class="flex justify-between items-center">
        <label>Juegos Equipo 1:</label>
        <input v-model="juegos[0]" class="text-black px-2 py-1 rounded w-24" />
      </div>
      <div class="flex justify-between items-center">
        <label>Juegos Equipo 2:</label>
        <input v-model="juegos[1]" class="text-black px-2 py-1 rounded w-24" />
      </div>

      <!-- Sets -->
      <div class="flex justify-between items-center">
        <label>Sets Equipo 1:</label>
        <input v-model="sets[0]" class="text-black px-2 py-1 rounded w-24" />
      </div>
      <div class="flex justify-between items-center">
        <label>Sets Equipo 2:</label>
        <input v-model="sets[1]" class="text-black px-2 py-1 rounded w-24" />
      </div>

      <button
        @click="guardarCambios"
        class="mt-6 bg-[#534E4E] text-white font-bold py-2 px-4 rounded hover:bg-[#5ADF14]"
      >
        Guardar cambios
      </button>
    </div>
  </div>
</template>
