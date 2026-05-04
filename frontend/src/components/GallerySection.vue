<script setup>
const galleryItems = [
  {
    src: '/images/DSC08101.JPG',
    alt: 'Атмосфера практики Лила',
    title: 'Пространство встречи',
  },
  {
    src: '/images/2025-02-26 13-06-17.JPG',
    alt: 'Практика и пространство',
    title: 'Тихая практика',
  },
  {
    src: '/images/IMG_5131.JPG',
    alt: 'Детали пространства для практик',
    title: 'Детали пространства',
  },
  {
    src: '/images/Lila_Olga_2.2.poster.jpg',
    alt: 'Глубокое состояние практики',
    title: 'Глубокое состояние',
  },
]
</script>

<template>
  <section
    id="gallery"
    class="bg-white px-6 py-16 text-[#242424] md:px-8 md:py-20"
  >
    <div class="mx-auto max-w-[1200px]">
      <div class="mx-auto max-w-[760px] text-center">
        <p class="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-[#1E7D8B]/60">
          Визуальная история
        </p>

        <h2 class="text-4xl font-semibold leading-tight tracking-[0.01em] text-[#20201d] sm:text-5xl md:text-6xl">
          Галерея
        </h2>

        <p class="mt-5 text-lg leading-8 text-stone-600 sm:text-xl sm:leading-9">
          Атмосфера практик, встреч и пространства
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="item in galleryItems"
          :key="item.src"
          class="group relative h-[280px] overflow-hidden rounded-3xl bg-stone-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:h-[300px] lg:h-[280px]"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          >

          <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/25 to-black/10 px-6 text-center opacity-0 transition duration-300 group-hover:opacity-100">
            <h3 class="text-lg font-semibold leading-7 text-white drop-shadow-sm">
              {{ item.title }}
            </h3>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
