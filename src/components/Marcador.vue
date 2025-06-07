<script setup>
import { useRouter } from 'vue-router'
defineProps(['id'])

const router = useRouter()

function retroceder() {
    router.push('/')
}
</script>

<template>
  <div class="h-screen bg-[#383535] text-white flex flex-col items-center justify-center px-4 py-8">
    <!-- Título de padelScore -->
    <h1 class="text-5xl font-bold mb-12 text-center">
      <span class="text-white">PADEL</span><span class="text-[#5ADF14]">SCORE</span>
    </h1>

    <!-- Encabezado del partido -->
    <p class="flex items-center gap-2 text-sm font-semibold uppercase text-white mb-2">
      <span class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
      Partido en directo
    </p>
    <p class="text-sm text-gray-400 mb-4">ID del partido: {{ id }}</p>

    <!-- Marcador principal -->
    <div class="flex justify-center items-end gap-8 mb-6 text-center">
      <div>
        <p class="text-blue-400 font-semibold text-lg">Equipo 1</p>
        <p class="text-6xl font-bold">15</p>
      </div>
      <p class="text-5xl font-bold">-</p>
      <div>
        <p class="text-red-400 font-semibold text-lg">Equipo 2</p>
        <p class="text-6xl font-bold">40</p>
      </div>
    </div>

    <!-- Tabla de marcador inferior -->
    <div class="bg-[#4a4a4a] rounded-xl px-6 py-4">
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
            <td class="py-1">15</td>
            <td>1</td>
            <td>5</td>
          </tr>
          <tr class="text-red-400 font-semibold">
            <td class="py-1">40</td>
            <td>0</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button
      @click="retroceder"
      class="justify-center mt-8 text-white font-semibold bg-[#534E4E] px-4 py-2 rounded-full hover:bg-[#5ADF14]"
    >
        Inicio
    </button>
  </div> 
</template>

<style>
</style>
