<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const idPartido = ref('')
const router = useRouter()

function buscar() {
  const id = idPartido.value.trim()
  if (id !== '') {
    router.push(`/partido/${id}`)
  }
}
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center bg-[#383535] px-4">
    <h1 class="text-5xl font-bold mb-12 text-center">
      <span class="text-white">PADEL</span><span class="text-[#5ADF14]">SCORE</span>
    </h1>

    <div class="flex items-center gap-4">
      <div class="bg-[#534E4E] rounded-full px-6 py-2 shadow-inner">
        <input
          v-model="idPartido"
          type="text"
          placeholder="Introduce el id del partido:"
          class="bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      <button
        @click="buscar"
        class="bg-[#534E4E] text-white hover:bg-[#5ADF14] rounded-full px-4 py-2 shadow-md text-xl"
      >
        🔍
      </button>
    </div>
  </div>
</template>
