<script setup>
import { useAppStore } from '../stores'

const appStore = useAppStore()
</script>

<template>
  <section class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/10">
    <p class="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#8B7449]">
      Home
    </p>
    <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
      {{ appStore.appName }} is ready
    </h1>
    <p class="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
      Vue 3, Vite, Tailwind CSS, Pinia, and Vue Router are connected.
    </p>
  </section>
</template>
