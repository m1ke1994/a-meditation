<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  service: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

const initialForm = () => ({
  name: '',
  phone: '',
  date: '',
})

const form = ref(initialForm())
const errors = ref({})
const isSubmitted = ref(false)
const isSending = ref(false)
const modalRef = ref(null)

let closeTimer = 0
let previousBodyOverflow = ''

const isOpen = computed(() => Boolean(props.service))

const resetForm = () => {
  form.value = initialForm()
  errors.value = {}
  isSubmitted.value = false
  isSending.value = false
}

const closeModal = () => {
  window.clearTimeout(closeTimer)
  resetForm()
  emit('close')
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeModal()
  }
}

const addKeydownListener = () => {
  window.addEventListener('keydown', handleKeydown)
}

const removeKeydownListener = () => {
  window.removeEventListener('keydown', handleKeydown)
}

const validatePhone = (value) => {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

const validateForm = () => {
  const nextErrors = {}

  if (!form.value.name.trim()) {
    nextErrors.name = 'Введите имя'
  }

  if (!form.value.phone.trim()) {
    nextErrors.phone = 'Введите телефон'
  } else if (!validatePhone(form.value.phone)) {
    nextErrors.phone = 'Проверьте телефон'
  }

  if (!form.value.date) {
    nextErrors.date = 'Выберите дату'
  }

  errors.value = nextErrors
  return Object.keys(nextErrors).length === 0
}

const submitForm = async () => {
  if (!validateForm()) return

  isSending.value = true

  const payload = {
    service: props.service,
    ...form.value,
  }

  // TODO: подключить отправку заявки в API или Telegram-уведомление.
  console.log('Service order request:', payload)

  await new Promise((resolve) => window.setTimeout(resolve, 450))

  isSending.value = false
  isSubmitted.value = true

  closeTimer = window.setTimeout(() => {
    closeModal()
  }, 1600)
}

watch(isOpen, async (value) => {
  if (!value) {
    document.body.style.overflow = previousBodyOverflow
    return
  }

  previousBodyOverflow = document.body.style.overflow
  document.body.style.overflow = 'hidden'

  await nextTick()
  modalRef.value?.focus()
})

onBeforeUnmount(() => {
  window.clearTimeout(closeTimer)
  removeKeydownListener()
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      @after-enter="addKeydownListener"
      @after-leave="removeKeydownListener"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md sm:p-6"
        @click.self="closeModal"
      >
        <Transition
          appear
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-8 scale-[0.98] opacity-0"
          enter-to-class="translate-y-0 scale-100 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-y-0 scale-100 opacity-100"
          leave-to-class="translate-y-6 scale-[0.98] opacity-0"
        >
          <div
            ref="modalRef"
            tabindex="-1"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-order-title"
            class="relative box-border max-h-[90vh] w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-white/60 bg-[#FBF7EF] text-[#24231F] shadow-[0_32px_100px_rgba(0,0,0,0.24)] outline-none"
          >
            <button
              type="button"
              class="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/80 text-stone-600 shadow-sm transition duration-300 hover:bg-[#24231F] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#8B7449]/40"
              aria-label="Закрыть окно"
              @click="closeModal"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>

            <div class="box-border max-h-[90vh] w-full min-w-0 overflow-y-auto p-5 sm:p-6 md:p-8">
              <div class="min-w-0 pr-12">
                <p class="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-[#8B7449]/65">
                  Заявка
                </p>

                <h2
                  id="service-order-title"
                  class="text-2xl font-semibold leading-tight text-[#24231F] sm:text-3xl"
                >
                  Записаться на услугу
                </h2>
              </div>

              <div class="mt-5 box-border w-full min-w-0 rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
                <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                  Выбранный формат
                </p>

                <h3 class="mt-2 min-w-0 text-xl font-semibold leading-7 text-[#24231F]">
                  {{ service.title }}
                </h3>

                <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div class="box-border min-w-0 rounded-2xl bg-[#FBF7EF] px-4 py-3">
                    <span class="block text-[11px] uppercase tracking-[0.16em] text-stone-500">Стоимость</span>
                    <span class="mt-1 block min-w-0 text-sm font-semibold text-[#8B7449]">{{ service.price }}</span>
                  </div>

                  <div class="box-border min-w-0 rounded-2xl bg-[#FBF7EF] px-4 py-3">
                    <span class="block text-[11px] uppercase tracking-[0.16em] text-stone-500">Длительность</span>
                    <span class="mt-1 block min-w-0 text-sm font-semibold text-[#24231F]">{{ service.duration }}</span>
                  </div>
                </div>
              </div>

              <div
                v-if="isSubmitted"
                class="mt-5 box-border w-full min-w-0 rounded-3xl border border-[#8B7449]/20 bg-white p-5 text-center shadow-sm"
              >
                <p class="text-lg font-semibold text-[#24231F]">
                  Заявка успешно отправлена
                </p>
              </div>

              <form
                v-else
                class="mt-5 grid w-full min-w-0 grid-cols-1 gap-4"
                @submit.prevent="submitForm"
              >
                <label class="block min-w-0">
                  <span class="mb-1.5 block text-sm font-medium text-[#24231F]">Имя</span>
                  <input
                    v-model="form.name"
                    type="text"
                    class="block box-border w-full min-w-0 max-w-full rounded-2xl border bg-[#F8F3EA] px-4 py-3 text-sm text-[#24231F] outline-none transition placeholder:text-stone-500 focus:border-[#8B7449] focus:bg-white"
                    :class="errors.name ? 'border-[#8B7449]' : 'border-[#8B7449]/20'"
                    placeholder="Ваше имя"
                  >
                  <span
                    v-if="errors.name"
                    class="mt-1.5 block text-sm text-[#8B7449]"
                  >
                    {{ errors.name }}
                  </span>
                </label>

                <label class="block min-w-0">
                  <span class="mb-1.5 block text-sm font-medium text-[#24231F]">Телефон</span>
                  <input
                    v-model="form.phone"
                    type="tel"
                    class="block box-border w-full min-w-0 max-w-full rounded-2xl border bg-[#F8F3EA] px-4 py-3 text-sm text-[#24231F] outline-none transition placeholder:text-stone-500 focus:border-[#8B7449] focus:bg-white"
                    :class="errors.phone ? 'border-[#8B7449]' : 'border-[#8B7449]/20'"
                    placeholder="+7 999 000-00-00"
                  >
                  <span
                    v-if="errors.phone"
                    class="mt-1.5 block text-sm text-[#8B7449]"
                  >
                    {{ errors.phone }}
                  </span>
                </label>

                <label class="block min-w-0">
                  <span class="mb-1.5 block text-sm font-medium text-[#24231F]">Желаемая дата</span>
                  <input
                    v-model="form.date"
                    type="date"
                    class="block box-border w-full min-w-0 max-w-full rounded-2xl border bg-[#F8F3EA] px-4 py-3 text-sm text-[#24231F] outline-none transition focus:border-[#8B7449] focus:bg-white"
                    :class="errors.date ? 'border-[#8B7449]' : 'border-[#8B7449]/20'"
                  >
                  <span
                    v-if="errors.date"
                    class="mt-1.5 block text-sm text-[#8B7449]"
                  >
                    {{ errors.date }}
                  </span>
                </label>

                <div class="flex min-w-0 flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    class="w-full rounded-full border border-[#24231F]/25 bg-[#24231F] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#8B7449] hover:shadow-[0_18px_45px_rgba(139,116,73,0.18)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:flex-1"
                    :disabled="isSending"
                  >
                    {{ isSending ? 'Отправляем...' : 'Отправить' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
