<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useSiteContentStore } from '../admin/stores/siteContent'

const contentStore = useSiteContentStore()
const meditations = computed(() => contentStore.content.meditations)
const practices = computed(() => meditations.value.practices || [])

const selectedMedia = ref(null)
let previousBodyOverflow = ''

const openMedia = (practice) => {
  selectedMedia.value = {
    src: practice.image,
    type: practice.type,
    alt: practice.title,
  }

  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

const closeMedia = () => {
  selectedMedia.value = null
  document.body.style.overflow = previousBodyOverflow
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && selectedMedia.value) {
    closeMedia()
  }
}

const goToMeditationsPricing = () => {
  window.dispatchEvent(new CustomEvent('select-service-tab', { detail: 'meditations' }))

  requestAnimationFrame(() => {
    document.querySelector('#pricing')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <section
    id="meditations"
    class="relative isolate scroll-mt-24 overflow-hidden bg-[#F8F3EA] px-5 py-16 text-[#24231F] sm:px-6 md:px-8 md:py-24"
  >
    <div class="pointer-events-none absolute left-[-180px] top-[-120px] -z-10 h-[420px] w-[420px] rounded-full bg-white/80 blur-3xl" />
    <div class="pointer-events-none absolute bottom-[-180px] right-[-160px] -z-10 h-[460px] w-[460px] rounded-full bg-[#8B7449]/35 blur-3xl" />

    <div class="mx-auto max-w-[1220px]">
      <div class="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
        <div>
          <span class="mb-4 inline-flex rounded-full border border-[#8B7449]/40 bg-white/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[#8B7449]">
            {{ meditations.eyebrow }}
          </span>

          <h2 class="text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#24231F] sm:text-5xl md:text-6xl">
            {{ meditations.title }}
            <span class="block text-[#8B7449]">{{ meditations.accent }}</span>
          </h2>
        </div>

        <div class="max-w-2xl lg:justify-self-end">
          <p class="text-xl font-medium leading-8 text-[#24231F] sm:text-2xl sm:leading-9">
            {{ meditations.subtitle }}
          </p>

          <p class="mt-5 text-base leading-8 text-stone-600 sm:text-lg sm:leading-8">
            {{ meditations.text }}
          </p>
        </div>
      </div>

      <div class="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="practice in practices"
          :key="practice.title"
          class="group relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/80 p-3 shadow-[0_22px_70px_rgba(45,35,20,0.10)] backdrop-blur-xl transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_90px_rgba(45,35,20,0.16)]"
        >
          <button
            type="button"
            class="relative block h-[330px] w-full cursor-zoom-in overflow-hidden rounded-[1.45rem] bg-[#FBF7EF] text-left"
            :aria-label="`Открыть ${practice.title}`"
            @click="openMedia(practice)"
          >
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

            <div class="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-[#24231F]/10" />
          </button>
        </article>
      </div>

      <div class="mt-8 rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-[0_20px_65px_rgba(45,35,20,0.08)] backdrop-blur-xl md:p-8">
        <div class="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p class="text-sm font-medium uppercase tracking-[0.22em] text-[#8B7449]">
              {{ meditations.formatTitle }}
            </p>

            <p class="mt-3 max-w-3xl text-lg leading-8 text-stone-700">
              {{ meditations.formatText }}
            </p>
          </div>

          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-[#24231F] px-6 py-4 text-sm font-medium text-white shadow-lg shadow-[#24231F]/15 transition duration-300 hover:-translate-y-0.5 hover:bg-[#8B7449] hover:shadow-[0_16px_40px_rgba(139,116,73,0.18)]"
            @click="goToMeditationsPricing"
          >
            {{ meditations.buttonText }}
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="media-modal">
        <div
          v-if="selectedMedia"
          class="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 p-5 backdrop-blur-md sm:p-6"
          @click="closeMedia"
        >
          <button
            type="button"
            class="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-white hover:text-[#24231F] sm:right-6 sm:top-6"
            aria-label="Закрыть просмотр"
            @click.stop="closeMedia"
          >
            <svg
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <img
            v-if="selectedMedia.type === 'image'"
            :src="selectedMedia.src"
            :alt="selectedMedia.alt"
            class="max-h-[88vh] max-w-[calc(100vw-32px)] rounded-2xl object-contain shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:max-h-[92vh] sm:max-w-[92vw]"
            @click.stop
          >

          <video
            v-else
            :src="selectedMedia.src"
            class="max-h-[88vh] max-w-[calc(100vw-32px)] rounded-2xl object-contain shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:max-h-[92vh] sm:max-w-[92vw]"
            controls
            autoplay
            muted
            loop
            playsinline
            @click.stop
          />
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.media-modal-enter-active,
.media-modal-leave-active {
  transition: opacity 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.media-modal-enter-from,
.media-modal-leave-to {
  opacity: 0;
}

.media-modal-enter-active img,
.media-modal-enter-active video,
.media-modal-leave-active img,
.media-modal-leave-active video {
  transition:
    opacity 300ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.media-modal-enter-from img,
.media-modal-enter-from video,
.media-modal-leave-to img,
.media-modal-leave-to video {
  opacity: 0;
  transform: scale(0.96);
}
</style>
