<template>
  <div class="h-screen flex flex-col justify-center items-center bg-[#383535] px-4">
    <h1 class="text-5xl font-bold mb-12 text-center">
      <span class="text-white">PADEL</span><span class="text-[#5ADF14]">SCORE</span>
    </h1>

    <!-- input y el boton -->
    <div class="flex items-center gap-4">
      <!-- este es el contenedor del input -->
      <div class="bg-[#534E4E] rounded-full px-6 py-2 shadow-inner">
        <input
          type="text"
          placeholder="Introduce el id del partido:"
          class="bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>

      <!-- boton de la lupita -->
      <button class="bg-[#534E4E] text-white hover:bg-[#5ADF14] rounded-full px-4 py-2 shadow-md text-xl">
        🔍
      </button>
    </div>
  </div>
</template>
