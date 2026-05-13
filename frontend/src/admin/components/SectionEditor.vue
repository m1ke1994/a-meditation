<script setup>
import { computed } from 'vue'
import AdminField from './AdminField.vue'
import EditableList from './EditableList.vue'
import AdminFileUpload from './AdminFileUpload.vue'
import { adminFieldLabels, adminHints, adminListLabels } from '../data/adminLabels'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const section = computed({
  get: () => props.modelValue || {},
  set: (value) => emit('update:modelValue', value),
})

const updateKey = (key, value) => {
  section.value = {
    ...section.value,
    [key]: value,
  }
}

const makeFactory = (items) => {
  const sample = items?.[0]
  if (!sample || typeof sample !== 'object') return () => ''

  return () => Object.fromEntries(Object.keys(sample).map((key) => [key, '']))
}

const labelFor = (key) => adminFieldLabels[key] || 'Дополнительное поле'
const listTitleFor = (key) => adminListLabels[key] || 'Дополнительные элементы'
const isMediaKey = (key) => ['image', 'src', 'avatar', 'videoUrl', 'posterUrl'].includes(key)
const isLongTextKey = (key) => (
  ['text', 'intro', 'message', 'bottomText', 'formatText', 'closingText', 'description'].includes(key)
)
const uploadType = (key) => (key === 'videoUrl' ? 'video' : 'image')
</script>

<template>
  <div class="grid min-w-0 max-w-full gap-5 overflow-hidden">
    <section class="max-w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_22px_70px_rgba(45,35,20,0.10)] dark:border-white/10 dark:bg-[#1E1C19] dark:shadow-none">
      <h2 class="break-words text-2xl font-semibold text-[#24231F] dark:text-[#F3EEE5]">{{ title }}</h2>
      <p class="mt-2 break-words text-sm leading-6 text-stone-600 dark:text-[#B7ADA0]">
        {{ adminHints.editorText }}
      </p>
    </section>

    <template
      v-for="(value, key) in section"
      :key="key"
    >
      <EditableList
        v-if="Array.isArray(value)"
        :title="listTitleFor(key)"
        :list-key="key"
        :model-value="value"
        :factory="makeFactory(value)"
        @update:model-value="updateKey(key, $event)"
      />

      <AdminFileUpload
        v-else-if="isMediaKey(key)"
        :label="labelFor(key)"
        :model-value="value"
        :type="uploadType(key)"
        @update:model-value="updateKey(key, $event)"
      />

      <AdminField
        v-else
        :label="labelFor(key)"
        :model-value="value"
        :type="isLongTextKey(key) ? 'textarea' : 'text'"
        @update:model-value="updateKey(key, $event)"
      />
    </template>
  </div>
</template>
