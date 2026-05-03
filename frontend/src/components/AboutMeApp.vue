<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
const counters = ref({
  percent: 0,
  games: 0,
})

const imageUrl = '/images/2025-02-26 12-35-42.JPG'

const metrics = [
  {
    id: 'percent',
    target: 100,
    suffix: '%',
    label: 'экологичное ведение',
    icon: 'M12 3.5c4.1 2.9 6.5 6.2 6.5 9.8a6.5 6.5 0 0 1-13 0c0-3.6 2.4-6.9 6.5-9.8Z M9.2 13.1l1.8 1.8 3.9-4.7',
  },
  {
    id: 'games',
    target: 2000,
    suffix: '+',
    label: 'проведённых игр',
    icon: 'M7 6.8h10 M7 11.8h10 M7 16.8h6 M5.5 3.5h13a1 1 0 0 1 1 1v15l-3-2-3 2-3-2-3 2-3-2-3 2v-15a1 1 0 0 1 1-1Z',
  },
  {
    id: 'soft',
    value: 'мягко',
    label: 'без давления',
    icon: 'M12 20c4.5-2.6 7-5.5 7-9.2A4.1 4.1 0 0 0 12 7a4.1 4.1 0 0 0-7 3.8C5 14.5 7.5 17.4 12 20Z',
  },
  {
    id: 'clear',
    value: 'ясно',
    label: 'простым языком',
    icon: 'M12 3.5v2.2 M12 18.3v2.2 M5.7 5.7l1.5 1.5 M16.8 16.8l1.5 1.5 M3.5 12h2.2 M18.3 12h2.2 M5.7 18.3l1.5-1.5 M16.8 7.2l1.5-1.5 M8.5 12a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Z',
  },
]

const paragraphs = [
  'Если Лила — это зеркало, то проводник — это тот, кто заботится о его прозрачности, ясности и безопасности.',
  'Как говорит Александр Филамов, ему свойственны простые практики, юмор, лёгкость и спокойствие.',
  'Александр Филамов — наставник для ведущих игры Лила. Преподаватель йоги и медитации. Ученик Омкара, Садхгуру, Лобсанга Тенпа. Разработчик уникальных полей игры Лила. Исследователь культурных древностей мира Востока и Запада.',
  'Путешественник. Скалолаз. Инженер космической и атомной промышленности. Предприниматель. Искатель, продолжающий движение на пути познания.',
]

let observer
let animationFrameId = 0
let hasAnimatedCounters = false

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3)

const animateCounters = () => {
  if (hasAnimatedCounters) return

  hasAnimatedCounters = true
  const duration = 1400
  const startTime = performance.now()

  const tick = (time) => {
    const progress = Math.min((time - startTime) / duration, 1)
    const easedProgress = easeOutCubic(progress)

    counters.value = {
      percent: Math.round(100 * easedProgress),
      games: Math.round(2000 * easedProgress),
    }

    if (progress < 1) {
      animationFrameId = window.requestAnimationFrame(tick)
      return
    }

    counters.value = {
      percent: 100,
      games: 2000,
    }
  }

  animationFrameId = window.requestAnimationFrame(tick)
}

const metricValue = (metric) => {
  if (metric.value) return metric.value

  return `${counters.value[metric.id]}${metric.suffix}`
}

onMounted(() => {
  if (!sectionRef.value) return

  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    animateCounters()
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return

      isVisible.value = true
      animateCounters()
      observer?.disconnect()
    },
    {
      rootMargin: '0px 0px -16% 0px',
      threshold: 0.16,
    },
  )

  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()

  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId)
  }
})
</script>

<template>
  <section
    id="guide"
    ref="sectionRef"
    class="scroll-mt-24 bg-white px-6 py-12 text-[#252525] md:px-8 md:py-16"
  >
    <div class="mx-auto max-w-[1200px]">
      <div class="grid items-stretch gap-8 md:grid-cols-[0.95fr_1.05fr] md:gap-10 lg:gap-12">
        <div
          class="h-[460px] overflow-hidden rounded-3xl shadow-xl shadow-black/18 transition-all duration-1000 ease-out sm:h-[560px] md:h-full md:min-h-[620px]"
          :class="isVisible ? 'translate-x-0 translate-y-0 opacity-100 blur-0' : '-translate-x-8 translate-y-6 opacity-0 blur-sm'"
        >
          <img
            :src="imageUrl"
            alt="Александр Филамов, проводник игры Лила"
            class="h-full w-full object-cover"
          >
        </div>

        <div
          class="flex h-full flex-col justify-center rounded-3xl border border-black/10 bg-[#fbfaf7] p-6 shadow-sm transition-all delay-150 duration-1000 ease-out sm:p-8 md:min-h-[620px] lg:p-10"
          :class="isVisible ? 'translate-x-0 translate-y-0 opacity-100 blur-0' : 'translate-x-8 translate-y-6 opacity-0 blur-sm'"
        >
          <h2 class="max-w-[720px] text-3xl font-semibold leading-[1.08] text-[#20201d] sm:text-4xl md:text-5xl">
            Проводник Лилы —
            <span class="block">бережное пространство для честной встречи с собой</span>
          </h2>

          <div class="mt-7 space-y-4 text-base leading-8 text-stone-700 sm:text-lg sm:leading-8">
            <p
              v-for="paragraph in paragraphs"
              :key="paragraph"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
        <article
          v-for="(metric, index) in metrics"
          :key="metric.id"
          class="group flex min-h-28 items-center gap-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-teal-950/20 hover:shadow-[0_22px_55px_rgba(0,0,0,0.08)]"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
          :style="{ transitionDelay: `${320 + index * 110}ms` }"
        >
          <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-950 text-white shadow-md shadow-teal-950/15 transition duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path :d="metric.icon" />
            </svg>
          </span>

          <span>
            <span class="block text-2xl font-semibold leading-7 text-[#24231f]">
              {{ metricValue(metric) }}
            </span>
            <span class="mt-1 block text-sm leading-5 text-stone-500">
              {{ metric.label }}
            </span>
          </span>
        </article>
      </div>
    </div>
  </section>
</template>
