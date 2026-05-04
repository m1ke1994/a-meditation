<script setup>
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'

const heroPosterUrl = '/images/Lila_Olga_2.2.poster.jpg'
const heroVideoUrl = '/images/Lila_Olga_2.2_compressed.mp4'

const heroPhrases = [
  'Игра, которая помогает услышать себя',
  'Пространство для честного внутреннего диалога',
  'Мягкий путь к ясности, решениям и опоре',
  'Лила в Москве — встреча с собой через игру',
  'Когда ответы приходят не из шума, а из тишины',
]

const heroRef = ref(null)
const videoRef = ref(null)
const activePhraseIndex = ref(0)

let observer
let phraseInterval

const loadVideo = () => {
  requestAnimationFrame(() => {
    videoRef.value?.load()
    videoRef.value?.play().catch(() => {})
  })
}

const scrollToSection = (targetId) => {
  document.getElementById(targetId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

onMounted(() => {
  phraseInterval = window.setInterval(() => {
    activePhraseIndex.value = (activePhraseIndex.value + 1) % heroPhrases.length
  }, 3800)

  if (!heroRef.value) return

  if (!('IntersectionObserver' in window)) {
    loadVideo()
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return

      loadVideo()
      observer?.disconnect()
    },
    {
      rootMargin: '320px 0px',
      threshold: 0.01,
    },
  )

  observer.observe(heroRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

onUnmounted(() => {
  if (phraseInterval) {
    window.clearInterval(phraseInterval)
  }
})
</script>

<template>
  <section
    ref="heroRef"
    class="relative isolate flex min-h-screen items-center overflow-hidden bg-zinc-950 pt-16 text-white md:pt-[72px]"
  >
    <video
      ref="videoRef"
      class="absolute inset-0 -z-20 h-full w-full object-cover"
      autoplay
      loop
      muted
      playsinline
      webkit-playsinline
      preload="auto"
      :poster="heroPosterUrl"
      aria-hidden="true"
    >
      <source :src="heroVideoUrl" type="video/mp4">
    </video>

    <div class="absolute inset-0 -z-10 bg-black/10" />
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-black/40 via-black/12 to-white/18" />
    <div class="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-zinc-950/24 to-transparent" />

    <div class="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-8">
      <div class="max-w-[760px]">
        <p class="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-white/75">
          ЛИЛА МОСКВА
        </p>

        <div class="relative min-h-[220px] sm:min-h-[250px] md:min-h-[300px]">
          <Transition name="hero-phrase" mode="out-in">
            <h1
              :key="activePhraseIndex"
              class="absolute left-0 top-0 max-w-[760px] text-3xl font-semibold leading-[1.08] tracking-[0.01em] text-white text-balance sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {{ heroPhrases[activePhraseIndex] }}
            </h1>
          </Transition>
        </div>

        <p class="mt-1 max-w-2xl text-base leading-7 text-white/78 sm:text-lg md:text-xl md:leading-8">
          Практика, где игра становится проводником к ясности, спокойствию и внутренним ответам.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#"
            class="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-white/16 px-7 text-sm font-medium text-white shadow-lg shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/22 hover:shadow-[0_18px_45px_rgba(255,255,255,0.13)]"
            @click.prevent="scrollToSection('contacts')"
          >
            Записаться на игру
          </a>
          <a
            href="#"
            class="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-black/20 px-7 text-sm font-medium text-white/90 shadow-lg shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/12 hover:text-white hover:shadow-[0_18px_45px_rgba(255,255,255,0.1)]"
            @click.prevent="scrollToSection('pricing')"
          >
            Узнать стоимость
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-phrase-enter-active,
.hero-phrase-leave-active {
  transition:
    opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-phrase-enter-from {
  opacity: 0;
  transform: translateY(22px);
  filter: blur(16px);
}

.hero-phrase-enter-to,
.hero-phrase-leave-from {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.hero-phrase-leave-to {
  opacity: 0;
  transform: translateY(-18px);
  filter: blur(14px);
}
</style>
