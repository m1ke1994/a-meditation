<script setup>
const cards = [
  {
    number: '01',
    title: 'Глубокое расслабление',
    text: 'Практика помогает отпустить накопленное напряжение и вернуться к более спокойному телесному состоянию.',
  },
  {
    number: '02',
    title: 'Восстановление ресурса',
    text: 'Мягкий темп, дыхание и внимание к себе создают пространство для отдыха и внутреннего наполнения.',
  },
  {
    number: '03',
    title: 'Контакт с собой',
    text: 'В тишине становится проще услышать свои чувства, потребности и честные внутренние ответы.',
  },
  {
    number: '04',
    title: 'Мягкая внутренняя настройка',
    text: 'Практика помогает бережно собраться, почувствовать опору и настроиться на важный период.',
  },
]
</script>

<template>
  <section
    id="meditations"
    class="relative isolate scroll-mt-24 overflow-hidden bg-[#fbfaf7] px-6 py-16 text-[#242424] md:px-8 md:py-20"
  >
    <div class="absolute left-[-120px] top-16 -z-10 h-72 w-72 rounded-full bg-[#1E7D8B]/8 blur-3xl" />
    <div class="absolute bottom-[-140px] right-[-90px] -z-10 h-80 w-80 rounded-full bg-stone-300/30 blur-3xl" />

    <div class="mx-auto max-w-[1200px]">
      <div class="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <p class="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-[#1E7D8B]/65">
            Практики тишины
          </p>

          <h2 class="text-4xl font-semibold leading-tight tracking-[0.01em] text-[#20201d] sm:text-5xl md:text-6xl">
            Медитации
          </h2>
        </div>

        <div class="max-w-2xl lg:justify-self-end">
          <p class="text-xl font-medium leading-8 text-[#20201d] sm:text-2xl sm:leading-9">
            Практики тишины, восстановления и внутреннего контакта
          </p>

          <p class="mt-5 text-base leading-8 text-stone-600 sm:text-lg sm:leading-8">
            Медитации помогают замедлиться, услышать себя и мягко вернуться в состояние внутренней опоры. Это пространство, где можно отпустить напряжение, восстановить ресурс и бережно встретиться со своими чувствами.
          </p>
        </div>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="card in cards"
          :key="card.title"
          class="group relative min-h-[270px] overflow-hidden rounded-3xl border border-black/10 bg-white/82 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-[#1E7D8B]/25 hover:shadow-[0_24px_70px_rgba(0,0,0,0.09)]"
        >
          <div class="mb-8 flex items-center justify-between">
            <span class="text-xs font-semibold tracking-[0.22em] text-black/35">
              {{ card.number }}
            </span>
            <span class="h-2.5 w-2.5 rounded-full bg-[#1E7D8B]/35 transition duration-300 group-hover:bg-[#0C5865]/70" />
          </div>

          <h3 class="text-xl font-semibold leading-7 text-[#24231f]">
            {{ card.title }}
          </h3>

          <p class="mt-5 text-base leading-7 text-stone-600">
            {{ card.text }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
