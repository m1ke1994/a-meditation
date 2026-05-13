<script setup>
import { computed, ref } from 'vue'
import { adminActionLabels, adminHints } from '../data/adminLabels'
import { readFileAsDataUrl } from '../composables/useFileDataUrl'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    default: adminHints.fileFormats,
  },
  modelValue: {
    type: String,
    default: '',
  },
  accept: {
    type: String,
    default: 'image/jpeg,image/png,image/webp,video/mp4',
  },
  type: {
    type: String,
    default: 'image',
    validator: (value) => ['image', 'video', 'avatar'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)
const error = ref('')

const hasFile = computed(() => Boolean(props.modelValue))
const isVideo = computed(() => (
  props.type === 'video' || props.modelValue.includes('video') || /\.(mp4|webm)$/i.test(props.modelValue)
))
const previewLabel = computed(() => (isVideo.value ? 'Текущее видео' : 'Текущее изображение'))
const previewClass = computed(() => {
  if (props.type === 'avatar') return 'h-24 w-24 rounded-full'
  return 'h-[170px] w-full rounded-2xl'
})

const openPicker = () => {
  inputRef.value?.click()
}

const clearFile = () => {
  error.value = ''
  emit('update:modelValue', '')
}

const handleFile = async (event) => {
  const file = event.target.files?.[0]
  event.target.value = ''
  error.value = ''

  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4']

  if (!allowedTypes.includes(file.type)) {
    error.value = 'Поддерживаются только JPG, PNG, WEBP или MP4.'
    return
  }

  if (props.type === 'video' && !file.type.startsWith('video/')) {
    error.value = 'Для этого поля нужно загрузить видео MP4.'
    return
  }

  if (props.type !== 'video' && !file.type.startsWith('image/')) {
    error.value = 'Для этого поля нужно загрузить изображение.'
    return
  }

  emit('update:modelValue', await readFileAsDataUrl(file))
}
</script>

<template>
  <div class="w-full min-w-0 max-w-full overflow-hidden rounded-3xl border border-[#8B7449]/15 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#1E1C19] dark:shadow-none">
    <div class="grid min-w-0 gap-2">
      <div class="min-w-0">
        <p class="break-words text-sm font-semibold text-[#24231F] dark:text-[#F3EEE5]">{{ label }}</p>
        <p class="mt-1 break-words text-xs leading-5 text-stone-500 dark:text-[#B7ADA0]">{{ hint }}</p>
      </div>
      <span class="w-fit rounded-full bg-[#F8F3EA] px-3 py-1 text-xs font-medium text-stone-600 dark:bg-[#2A2621] dark:text-[#B7ADA0]">
        {{ hasFile ? adminActionLabels.fileSelected : adminActionLabels.fileEmpty }}
      </span>
    </div>

    <div class="mt-4 min-w-0 max-w-full">
      <div
        v-if="hasFile"
        class="grid min-w-0 gap-3"
      >
        <div
          class="max-w-full overflow-hidden border border-[#8B7449]/20 bg-[#F8F3EA] shadow-[0_12px_34px_rgba(45,35,20,0.10)] dark:border-white/10 dark:bg-[#22201D] dark:shadow-none"
          :class="previewClass"
        >
          <video
            v-if="isVideo"
            :src="modelValue"
            class="h-full w-full max-w-full object-cover"
            controls
            muted
            playsinline
          />
          <img
            v-else
            :src="modelValue"
            alt=""
            class="h-full w-full max-w-full object-cover"
          >
        </div>

        <div class="min-w-0">
          <p class="break-words text-sm font-medium text-[#24231F] dark:text-[#F3EEE5]">{{ previewLabel }}</p>
          <p class="mt-1 break-words text-xs leading-5 text-stone-500 dark:text-[#B7ADA0]">
            {{ adminHints.fileHelp }}
          </p>
        </div>
      </div>

      <div
        v-else
        class="grid min-h-[170px] min-w-0 place-items-center rounded-2xl border border-dashed border-[#8B7449]/30 bg-[#F8F3EA] p-4 text-center dark:border-white/10 dark:bg-[#22201D]"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#8B7449] shadow-sm dark:bg-[#1E1C19] dark:text-[#B89B67] dark:shadow-none">
          <svg
            viewBox="0 0 24 24"
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m8 13 2.5-2.5L15 15l1.5-1.5L21 18" />
            <circle cx="8.5" cy="9" r="1.2" />
          </svg>
        </div>
        <div class="min-w-0">
          <p class="break-words text-sm font-medium text-[#24231F] dark:text-[#F3EEE5]">{{ adminHints.fileEmptyTitle }}</p>
          <p class="mt-1 break-words text-xs leading-5 text-stone-500 dark:text-[#B7ADA0]">{{ adminHints.fileEmptyText }}</p>
        </div>
      </div>
    </div>

    <div class="mt-4 grid min-w-0 gap-2">
      <button
        type="button"
        class="w-full min-w-0 rounded-full bg-[#24231F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#8B7449] dark:bg-[#B89B67] dark:text-[#151412] dark:hover:bg-[#D6B781]"
        @click="openPicker"
      >
        {{ hasFile ? adminActionLabels.replaceFile : adminActionLabels.upload }}
      </button>
      <button
        v-if="hasFile"
        type="button"
        class="w-full min-w-0 rounded-full border border-[#8B7449]/25 bg-white px-4 py-2.5 text-sm font-medium text-[#24231F] transition hover:border-[#8B7449]/50 hover:text-[#8B7449] dark:border-white/10 dark:bg-[#22201D] dark:text-[#F3EEE5] dark:hover:border-[#B89B67]/50 dark:hover:text-[#B89B67]"
        @click="clearFile"
      >
        {{ adminActionLabels.removeFile }}
      </button>
    </div>

    <input
      ref="inputRef"
      type="file"
      :accept="accept"
      class="hidden"
      @change="handleFile"
    >

    <p
      v-if="error"
      class="mt-3 break-words text-sm text-[#8B7449] dark:text-[#B89B67]"
    >
      {{ error }}
    </p>
  </div>
</template>
