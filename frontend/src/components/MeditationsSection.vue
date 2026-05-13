<script setup>
const practices = [
  {
    number: '01',
    title: 'Глубокое расслабление',
    text: 'Мягкая практика помогает отпустить накопленное напряжение, замедлиться и вернуться в спокойное телесное состояние.',
    image: '/images/m1.jpg',
    type: 'image',
  },
  {
    number: '02',
    title: 'Восстановление ресурса',
    text: 'Дыхание, тишина и бережное внимание к себе создают пространство для отдыха, наполнения и внутренней опоры.',
    image: '/images/m2.MP4',
    type: 'video',
  },
  {
    number: '03',
    title: 'Контакт с собой',
    text: 'В спокойном пространстве становится проще услышать свои чувства, потребности и честные внутренние ответы.',
    image: '/images/m3.jpg',
    type: 'image',
  },
  {
    number: '04',
    title: 'Внутренняя настройка',
    text: 'Практика помогает мягко собраться, почувствовать устойчивость и настроиться на важный период жизни.',
    image: '/images/m4.jpg',
    type: 'image',
  },
]
</script>

<template>
  <section
    id="meditations"
    class="relative isolate scroll-mt-24 overflow-hidden bg-[#f8f3ea] px-5 py-16 text-[#252525] sm:px-6 md:px-8 md:py-24"
  >
    <div class="pointer-events-none absolute left-[-180px] top-[-120px] -z-10 h-[420px] w-[420px] rounded-full bg-white/80 blur-3xl" />
    <div class="pointer-events-none absolute bottom-[-180px] right-[-160px] -z-10 h-[460px] w-[460px] rounded-full bg-[#d9c7a3]/35 blur-3xl" />

    <div class="mx-auto max-w-[1220px]">
      <div class="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
        <div>
          <span class="mb-4 inline-flex rounded-full border border-[#b9a47a]/40 bg-white/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#8b7449]">
            Практики тишины
          </span>

          <h2 class="text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#1f1d19] sm:text-5xl md:text-6xl">
            Медитации
            <span class="block text-[#8b7449]">для восстановления</span>
          </h2>
        </div>

        <div class="max-w-2xl lg:justify-self-end">
          <p class="text-xl font-medium leading-8 text-[#20201d] sm:text-2xl sm:leading-9">
            Пространство тишины, бережного внимания и внутренней опоры
          </p>

          <p class="mt-5 text-base leading-8 text-stone-600 sm:text-lg sm:leading-8">
            Медитации помогают замедлиться, отпустить лишнее напряжение и мягко вернуться к себе. Это спокойная практика для восстановления ресурса, ясности и более глубокого контакта со своим состоянием.
          </p>
        </div>
      </div>

      <div class="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="practice in practices"
          :key="practice.title"
          class="group relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/80 p-3 shadow-[0_22px_70px_rgba(45,35,20,0.10)] backdrop-blur-xl transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_90px_rgba(45,35,20,0.16)]"
        >
          <div class="relative h-[330px] overflow-hidden rounded-[1.45rem] bg-[#e9dfcc]">
            <img
              v-if="practice.type === 'image'"
              :src="practice.image"
              :alt="practice.title"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
            >

            <video
              v-else
              class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            >
              <source
                :src="practice.image"
                type="video/mp4"
              >
            </video>

            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-transparent" />

            <div class="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/20 text-sm font-semibold text-white shadow-xl backdrop-blur-md">
              {{ practice.number }}
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h3 class="text-2xl font-semibold leading-7 tracking-[-0.03em]">
                {{ practice.title }}
              </h3>

              <p class="mt-4 text-sm leading-6 text-white/82">
                {{ practice.text }}
              </p>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-8 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_65px_rgba(45,35,20,0.08)] backdrop-blur-xl md:p-8">
        <div class="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p class="text-sm font-medium uppercase tracking-[0.22em] text-[#8b7449]">
              Формат практики
            </p>

            <p class="mt-3 max-w-3xl text-lg leading-8 text-stone-700">
              Медитации проходят в мягком темпе: без давления, без спешки и без необходимости “делать правильно”. Главное — ваше состояние, дыхание и бережное возвращение внимания к себе.
            </p>
          </div>

          <a
            href="#services"
            class="inline-flex items-center justify-center rounded-full bg-[#24392f] px-6 py-4 text-sm font-medium text-white shadow-lg shadow-[#24392f]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#1E7D8B] hover:shadow-[0_16px_40px_rgba(30,125,139,0.22)]"
          >
            Выбрать практику
          </a>
        </div>
      </div>
    </div>
  </section>
</template>