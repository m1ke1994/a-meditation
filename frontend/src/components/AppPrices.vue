<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { serviceGroups } from '../data/services'
import ServiceOrderModal from './ServiceOrderModal.vue'

const activeGroupId = ref(serviceGroups[0].id)
const selectedService = ref(null)

const activeGroup = computed(() => (
  serviceGroups.find((group) => group.id === activeGroupId.value) || serviceGroups[0]
))

const openOrderModal = (service) => {
  selectedService.value = service
}

const closeOrderModal = () => {
  selectedService.value = null
}

const handleServiceTabSelect = (event) => {
  const targetGroupId = event.detail

  if (!serviceGroups.some((group) => group.id === targetGroupId)) return

  activeGroupId.value = targetGroupId
}

onMounted(() => {
  window.addEventListener('select-service-tab', handleServiceTabSelect)
})

onBeforeUnmount(() => {
  window.removeEventListener('select-service-tab', handleServiceTabSelect)
})
</script>

<template>
  <section
    id="pricing"
    class="scroll-mt-24 bg-white px-6 py-16 text-[#242424] md:px-8 md:py-20"
  >
    <div class="mx-auto max-w-[1200px]">
      <div class="mx-auto max-w-[760px] text-center">
        <p class="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-[#1E7D8B]/60">
          Прайсы
        </p>

        <h2 class="text-3xl font-semibold uppercase leading-tight tracking-[0.08em] text-[#20201d] sm:text-4xl md:text-5xl">
          Форматы услуг
        </h2>

        <p class="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
          Выберите направление и подходящий формат участия
        </p>
      </div>

      <div class="mx-auto mt-8 flex w-full max-w-[520px] rounded-full border border-black/10 bg-[#f5f2ed] p-1.5 shadow-inner shadow-black/5">
        <button
          v-for="group in serviceGroups"
          :key="group.id"
          type="button"
          class="relative min-h-12 flex-1 rounded-full px-4 text-sm font-semibold uppercase tracking-[0.14em] transition duration-300 sm:text-[13px]"
          :class="activeGroupId === group.id ? 'bg-white text-[#0C5865] shadow-[0_12px_32px_rgba(0,0,0,0.09)]' : 'text-stone-500 hover:text-[#20201d]'"
          :aria-pressed="activeGroupId === group.id"
          @click="activeGroupId = group.id"
        >
          {{ group.label }}
        </button>
      </div>

      <p class="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-stone-500">
        {{ activeGroup.intro }}
      </p>

      <Transition
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-y-3 opacity-0 blur-sm"
        enter-to-class="translate-y-0 opacity-100 blur-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0 opacity-100 blur-0"
        leave-to-class="-translate-y-2 opacity-0 blur-sm"
      >
        <div
          :key="activeGroup.id"
          class="mt-10 grid min-h-[660px] gap-5 sm:grid-cols-2 sm:min-h-[690px] lg:grid-cols-3 lg:min-h-[650px]"
        >
          <article
            v-for="item in activeGroup.items"
            :key="item.title"
            class="group flex min-h-[300px] flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#1E7D8B]/25 hover:shadow-[0_24px_70px_rgba(0,0,0,0.1)]"
          >
            <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#1E7D8B]/8 text-[#1E7D8B] transition duration-300 group-hover:bg-[#0C5865] group-hover:text-white">
              <svg
                v-if="item.icon === 'group'"
                class="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 11a4 4 0 1 0-8 0" />
                <path d="M12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
                <path d="M4.5 10.5a2.5 2.5 0 1 0 0-5" />
                <path d="M2 20v-1a4 4 0 0 1 3-3.8" />
                <path d="M19.5 10.5a2.5 2.5 0 1 1 0-5" />
                <path d="M22 20v-1a4 4 0 0 0-3-3.8" />
              </svg>

              <svg
                v-else-if="item.icon === 'person'"
                class="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
              </svg>

              <svg
                v-else-if="item.icon === 'pair'"
                class="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="7" r="3.5" />
                <path d="M3.5 21v-1.5A5.5 5.5 0 0 1 9 14h1" />
                <circle cx="16.5" cy="8.5" r="3" />
                <path d="M13 21v-1a5 5 0 0 1 5-5h.5a5 5 0 0 1 2.5.67" />
              </svg>

              <svg
                v-else-if="item.icon === 'gift'"
                class="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 12v8H4v-8" />
                <path d="M2.5 7.5h19v4.5h-19z" />
                <path d="M12 7.5V20" />
                <path d="M12 7.5H8.5A2.25 2.25 0 1 1 12 5.25v2.25Z" />
                <path d="M12 7.5h3.5A2.25 2.25 0 1 0 12 5.25v2.25Z" />
              </svg>

              <svg
                v-else-if="item.icon === 'online'"
                class="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="5" width="18" height="12" rx="2" />
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M9 11.5h6" />
              </svg>

              <svg
                v-else-if="item.icon === 'intention'"
                class="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="7.5" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2.5v3" />
                <path d="M12 18.5v3" />
                <path d="M21.5 12h-3" />
                <path d="M5.5 12h-3" />
              </svg>

              <svg
                v-else
                class="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 15c3 0 3-6 6-6s3 6 6 6 3-6 6-6" />
                <path d="M3 20c3 0 3-4 6-4s3 4 6 4 3-4 6-4" />
              </svg>
            </div>

            <h3 class="text-xl font-semibold leading-7 text-[#24231f]">
              {{ item.title }}
            </h3>

            <p class="mt-3 text-base font-semibold text-[#1E7D8B]">
              {{ item.price }}
            </p>

            <p class="mt-1 text-sm leading-6 text-stone-500">
              {{ item.duration }}
            </p>

            <p class="mt-5 flex-1 text-sm leading-6 text-stone-600">
              {{ item.text }}
            </p>

            <button
              type="button"
              class="mt-6 rounded-full border border-[#1E7D8B]/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1E7D8B] transition duration-300 hover:border-[#0C5865] hover:bg-[#0C5865] hover:text-white"
              @click="openOrderModal(item)"
            >
              Записаться
            </button>
          </article>
        </div>
      </Transition>
    </div>

    <ServiceOrderModal
      :service="selectedService"
      @close="closeOrderModal"
    />
  </section>
</template>
