<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const usuario = ref('')
const contrasena = ref('')
const error = ref('')
const router = useRouter()
const route = useRoute()

function login() {
  if (usuario.value === 'admin' && contrasena.value === 'padel123') {
    sessionStorage.setItem('arbitroLogeado', 'true')
    router.push(`/panel-arbitro?id=${route.query.id}`)
  } else {
    error.value = 'Usuario o contraseña incorrectos.'
  }
}
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-[#383535] text-white px-4">
    <h2 class="text-3xl font-bold mb-6">Acceso árbitro</h2>

    <div class="flex flex-col gap-4 w-full max-w-xs">
      <input v-model="usuario" placeholder="Usuario" class="px-4 py-2 rounded bg-[#4a4a4a] text-white" />
      <input v-model="contrasena" type="password" placeholder="Contraseña" class="px-4 py-2 rounded bg-[#4a4a4a] text-white" />
      <button @click="login" class="bg-[#5ADF14] hover:bg-white hover:text-black text-black font-bold py-2 px-4 rounded">
        Entrar
      </button>
      <p v-if="error" class="text-red-400">{{ error }}</p>
    </div>
  </div>
</template>
