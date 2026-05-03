<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const sectionRef = ref(null)
const isVisible = ref(false)
const activeIndex = ref(0)

const reviews = [
  {
    name: 'Анна',
    date: '12 марта 2025',
    avatar: '/images/IMG_1245.JPG',
    text: 'Пришла с вопросом, который долго не могла сформулировать. Во время игры всё стало намного яснее. Очень бережное и спокойное пространство.',
  },
  {
    name: 'Мария',
    date: '28 апреля 2025',
    avatar: '/images/IMG_1246.JPG',
    text: 'Лила помогла увидеть повторяющийся сценарий, который я раньше не замечала. После игры появилось ощущение внутренней опоры.',
  },
  {
    name: 'Екатерина',
    date: '9 мая 2025',
    avatar: '/images/IMG_1249.JPG',
    text: 'Было удивительно, насколько точно поле отражает внутренние процессы. Без давления, без мистики, очень честно и глубоко.',
  },
  {
    name: 'Ольга',
    date: '21 июня 2025',
    avatar: '/images/IMG_1988.JPG',
    text: 'Мне понравилось, что всё проходило мягко и понятно. После игры я ушла с конкретными мыслями и спокойствием внутри.',
  },
  {
    name: 'Ирина',
    date: '3 августа 2025',
    avatar: '/images/IMG_2546.jpg',
    text: 'Это был не просто игровой опыт, а настоящая встреча с собой. Очень благодарна за бережное сопровождение.',
  },
  {
    name: 'Светлана',
    date: '17 сентября 2025',
    avatar: '/images/IMG_2599.jpg',
    text: 'После Лилы я смогла иначе посмотреть на ситуацию в отношениях. Появилось больше принятия и ясности.',
  },
  {
    name: 'Наталья',
    date: '5 октября 2025',
    avatar: '/images/IMG_2968.jpg',
    text: 'Очень глубокая практика. Понравилась атмосфера, спокойный темп и то, что ответы приходили естественно.',
  },
  {
    name: 'Алина',
    date: '19 ноября 2025',
    avatar: '/images/IMG_5131.JPG',
    text: 'Я пришла без ожиданий, а ушла с ощущением, что внутри стало тише и понятнее.',
  },
]

const activeReview = computed(() => reviews[activeIndex.value])

let observer
let touchStartX = 0
let touchDeltaX = 0

const nextReview = () => {
  activeIndex.value = (activeIndex.value + 1) % reviews.length
}

const prevReview = () => {
  activeIndex.value = activeIndex.value === 0 ? reviews.length - 1 : activeIndex.value - 1
}

const setReview = (index) => {
  activeIndex.value = index
}

const handleTouchStart = (event) => {
  touchStartX = event.touches[0]?.clientX ?? 0
  touchDeltaX = 0
}

const handleTouchMove = (event) => {
  const currentX = event.touches[0]?.clientX ?? touchStartX
  touchDeltaX = currentX - touchStartX
}

const handleTouchEnd = () => {
  if (Math.abs(touchDeltaX) < 48) return

  if (touchDeltaX < 0) {
    nextReview()
  } else {
    prevReview()
  }

  touchStartX = 0
  touchDeltaX = 0
}

onMounted(() => {
  if (!sectionRef.value) return

  if (!('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return

      isVisible.value = true
      observer?.disconnect()
    },
    {
      rootMargin: '0px 0px -16% 0px',
      threshold: 0.14,
    },
  )

  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    id="reviews"
    ref="sectionRef"
    class="scroll-mt-24 bg-white px-6 py-14 text-[#252525] md:px-8 md:py-20"
  >
    <div class="mx-auto max-w-[1200px]">
      <div
        class="mx-auto max-w-[780px] text-center transition-all duration-1000 ease-out"
        :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-6 opacity-0 blur-sm'"
      >
        <h2 class="text-3xl font-semibold leading-tight text-[#20201d] sm:text-4xl md:text-5xl">
          Отзывы участников
        </h2>
        <p class="mt-4 text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
          Истории людей, которые прошли игру Лила и нашли больше ясности, спокойствия и внутренней опоры.
        </p>
      </div>

      <div
        class="relative mx-auto mt-10 max-w-[820px] transition-all delay-150 duration-1000 ease-out"
        :class="isVisible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-8 opacity-0 blur-sm'"
        @touchstart.passive="handleTouchStart"
        @touchmove.passive="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <button
          type="button"
          class="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-16 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-2xl text-[#1E7D8B] shadow-lg transition hover:-translate-x-[4.25rem] hover:bg-[#0C5865] hover:text-white md:flex"
          aria-label="Предыдущий отзыв"
          @click="prevReview"
        >
          ‹
        </button>

        <Transition name="review-fade" mode="out-in">
          <article
            :key="`${activeReview.name}-${activeReview.date}`"
            class="flex min-h-[380px] flex-col rounded-[2rem] border border-black/10 bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.08)] sm:p-9 md:min-h-[390px] md:p-10"
          >
            <div class="flex items-center gap-4">
              <img
                :src="activeReview.avatar"
                :alt="activeReview.name"
                class="h-14 w-14 rounded-full object-cover ring-1 ring-black/10 md:h-16 md:w-16"
              >
              <div>
                <h3 class="text-lg font-semibold leading-7 text-[#22211e] md:text-xl">
                  {{ activeReview.name }}
                </h3>
                <p class="text-sm leading-5 text-stone-500">
                  {{ activeReview.date }}
                </p>
              </div>
            </div>

            <p class="mt-8 flex-1 text-xl leading-9 text-stone-700 md:text-2xl md:leading-10">
              {{ activeReview.text }}
            </p>

            <div class="mt-8 h-px w-full bg-gradient-to-r from-[#1E7D8B]/25 via-black/10 to-transparent" />
          </article>
        </Transition>

        <button
          type="button"
          class="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-16 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-2xl text-[#1E7D8B] shadow-lg transition hover:translate-x-[4.25rem] hover:bg-[#0C5865] hover:text-white md:flex"
          aria-label="Следующий отзыв"
          @click="nextReview"
        >
          ›
        </button>
      </div>

      <div class="mt-7 flex items-center justify-center gap-2">
        <button
          v-for="(_, index) in reviews"
          :key="index"
          type="button"
          class="h-2.5 rounded-full transition-all duration-300"
          :class="activeIndex === index ? 'w-8 bg-[#1E7D8B]' : 'w-2.5 bg-black/20 hover:bg-[#0C5865]/45'"
          :aria-label="`Показать отзыв ${index + 1}`"
          @click="setReview(index)"
        />
      </div>

      <p class="mt-4 text-center text-xs font-medium uppercase tracking-[0.22em] text-stone-400 md:hidden">
        листайте отзывы
      </p>
    </div>
  </section>
</template>

<style scoped>
.review-fade-enter-active,
.review-fade-leave-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s ease,
    filter 0.45s ease;
}

.review-fade-enter-from {
  opacity: 0;
  transform: translateY(18px) scale(0.98);
  filter: blur(8px);
}

.review-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
  filter: blur(8px);
}
</style>
