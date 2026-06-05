<script setup>
const navItems = [
  { label: 'О практике', href: '#guide' },
  { label: 'Медитации', href: '#meditations' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Стоимость', href: '#pricing' },
  { label: 'Контакты', href: '#contacts' },
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 border-b border-white/20 bg-[#24231F]/75 text-white backdrop-blur">
    <div class="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <a href="#top" class="text-sm font-semibold uppercase tracking-[0.22em]">A Meditation</a>

      <nav class="hidden items-center gap-5 md:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm font-medium text-white/78 transition hover:text-white"
        >
          {{ item.label }}
        </a>
      </nav>

      <a
        href="#contacts"
        class="rounded-full border border-white/35 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#24231F]"
      >
        Записаться
      </a>
    </div>
  </header>
</template>
