<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const idPartido = ref('')
const router = useRouter()
const error = ref(null)

const urlServidor = 'https://padelscore-web-server.onrender.com'

//Para buscar el partido en la base de datos y que me devuelva el partido o error si no existe
async function buscar() {
  error.value = null
  const id = idPartido.value.trim()

  if (id === '') return

  try {
    const response = await axios.get(`${urlServidor}/partido/${id}`)
    if (response.data && response.data.id) {
      router.push(`/partido/${id}`)
    } else {
      error.value = 'El partido no existe.'
    }
  } catch (err) {
    error.value = 'El partido no existe o hubo un error al buscar.'
  }
}
</script>

</script>

<template>
  <!-- Titulo de la pagina PADELSCORE -->
  <div class="h-screen flex flex-col justify-center items-center bg-[#383535] px-4">
    <h1 class="text-5xl font-bold mb-12 text-center">
      <span class="text-white">PADEL</span><span class="text-[#5ADF14]">SCORE</span>
    </h1>
    
    <!-- Barra de busqueda -->
    <div class="flex items-center gap-4">
      <div class="bg-[#534E4E] rounded-full px-6 py-2 shadow-inner">
        <input
          v-model="idPartido"
          type="text"
          placeholder="Introduce el id del partido:"
          class="bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      <!-- Boton de busqueda -->
      <button
        @click="buscar"
        class="bg-[#534E4E] text-white hover:bg-[#5ADF14] rounded-full px-4 py-2 shadow-md text-xl"
      >
        🔍
      </button>
    </div>

      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>
