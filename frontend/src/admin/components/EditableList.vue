<script setup>
import AdminField from './AdminField.vue'
import AdminFileUpload from './AdminFileUpload.vue'
import {
  adminActionLabels,
  adminFieldLabels,
  adminItemLabels,
  adminListLabels,
} from '../data/adminLabels'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  factory: {
    type: Function,
    default: () => ({}),
  },
  listKey: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const update = (nextItems) => {
  emit('update:modelValue', nextItems)
}

const updateItem = (index, key, value) => {
  const nextItems = props.modelValue.map((item, itemIndex) => (
    itemIndex === index ? (key === null ? value : { ...item, [key]: value }) : item
  ))
  update(nextItems)
}

const addItem = () => {
  update([...props.modelValue, props.factory()])
}

const removeItem = (index) => {
  update(props.modelValue.filter((_, itemIndex) => itemIndex !== index))
}

const moveItem = (index, direction) => {
  const nextIndex = index + direction
  if (nextIndex < 0 || nextIndex >= props.modelValue.length) return

  const nextItems = [...props.modelValue]
  const [item] = nextItems.splice(index, 1)
  nextItems.splice(nextIndex, 0, item)
  update(nextItems)
}

const makeFactory = (items) => {
  const sample = items?.[0]
  if (!sample || typeof sample !== 'object') return () => ''

  return () => Object.fromEntries(Object.keys(sample).map((key) => [key, '']))
}

const labelFor = (key) => adminFieldLabels[key] || 'Дополнительное поле'
const listTitleFor = (key) => adminListLabels[key] || key
const itemTitle = (index, item) => {
  const baseTitle = adminItemLabels[props.listKey] || adminItemLabels[props.title] || 'Элемент'
  const suffix = item?.title || item?.name || item?.label || ''

  return suffix ? `${baseTitle} ${index + 1}: ${suffix}` : `${baseTitle} ${index + 1}`
}

const isMediaKey = (key) => ['image', 'src', 'avatar', 'videoUrl', 'posterUrl'].includes(key)
const isLongTextKey = (key) => (
  ['text', 'intro', 'message', 'bottomText', 'formatText', 'description'].includes(key)
)
const uploadType = (key, item) => {
  if (key === 'avatar') return 'avatar'
  if (key === 'videoUrl' || item?.type === 'video') return 'video'
  return 'image'
}
</script>

<template>
  <section class="max-w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-[0_22px_70px_rgba(45,35,20,0.10)] dark:border-white/10 dark:bg-[#1E1C19] dark:shadow-none sm:p-5">
    <div class="grid min-w-0 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
      <h3 class="min-w-0 break-words text-lg font-semibold text-[#24231F] dark:text-[#F3EEE5]">
        {{ listTitleFor(listKey) || title }}
      </h3>
      <button
        type="button"
        class="w-full rounded-full bg-[#24231F] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8B7449] dark:bg-[#B89B67] dark:text-[#151412] dark:hover:bg-[#D6B781] sm:w-auto"
        @click="addItem"
      >
        {{ adminActionLabels.add }}
      </button>
    </div>

    <div class="mt-4 grid min-w-0 gap-4">
      <article
        v-for="(item, index) in modelValue"
        :key="index"
        class="min-w-0 max-w-full overflow-hidden rounded-[2rem] border border-[#8B7449]/15 bg-[#FBF7EF] p-4 shadow-sm dark:border-white/10 dark:bg-[#22201D] dark:shadow-none sm:p-5"
      >
        <div class="mb-5 grid min-w-0 gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
          <div class="min-w-0">
            <p class="break-words text-base font-semibold text-[#24231F] dark:text-[#F3EEE5]">{{ itemTitle(index, item) }}</p>
            <p class="mt-1 break-words text-xs text-stone-500 dark:text-[#B7ADA0]">Редактирование содержимого карточки</p>
          </div>
          <div class="grid grid-cols-3 gap-2 sm:flex sm:shrink-0">
            <button
              type="button"
              class="flex h-9 min-w-0 items-center justify-center rounded-full bg-white text-sm text-[#24231F] shadow-sm transition hover:-translate-y-0.5 hover:text-[#8B7449] dark:bg-[#1E1C19] dark:text-[#F3EEE5] dark:shadow-none dark:hover:text-[#B89B67] sm:w-9"
              @click="moveItem(index, -1)"
            >
              ↑
            </button>
            <button
              type="button"
              class="flex h-9 min-w-0 items-center justify-center rounded-full bg-white text-sm text-[#24231F] shadow-sm transition hover:-translate-y-0.5 hover:text-[#8B7449] dark:bg-[#1E1C19] dark:text-[#F3EEE5] dark:shadow-none dark:hover:text-[#B89B67] sm:w-9"
              @click="moveItem(index, 1)"
            >
              ↓
            </button>
            <button
              type="button"
              class="min-w-0 rounded-full bg-white px-3 py-2 text-xs font-medium text-[#8B7449] shadow-sm transition hover:-translate-y-0.5 dark:bg-[#1E1C19] dark:text-[#B89B67] dark:shadow-none sm:px-4"
              @click="removeItem(index)"
            >
              {{ adminActionLabels.delete }}
            </button>
          </div>
        </div>

        <div
          v-if="typeof item !== 'object' || item === null"
          class="grid min-w-0 gap-3"
        >
          <AdminField
            :label="labelFor('text')"
            type="textarea"
            :model-value="item"
            @update:model-value="updateItem(index, null, $event)"
          />
        </div>

        <div
          v-else
          class="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[280px_1fr]"
        >
          <div class="grid min-w-0 gap-3">
            <AdminFileUpload
              v-for="(_, key) in Object.fromEntries(Object.entries(item).filter(([itemKey]) => isMediaKey(itemKey)))"
              :key="key"
              :label="labelFor(key)"
              :model-value="item[key]"
              :type="uploadType(key, item)"
              @update:model-value="updateItem(index, key, $event)"
            />
          </div>

          <div class="grid min-w-0 grid-cols-1 gap-3 lg:grid-cols-2">
            <template
              v-for="(_, key) in item"
              :key="key"
            >
              <div
                v-if="Array.isArray(item[key])"
                class="min-w-0 lg:col-span-2"
              >
                <EditableList
                  :title="listTitleFor(key)"
                  :list-key="key"
                  :model-value="item[key]"
                  :factory="makeFactory(item[key])"
                  @update:model-value="updateItem(index, key, $event)"
                />
              </div>
              <AdminField
                v-else-if="!isMediaKey(key)"
                :label="labelFor(key)"
                :type="isLongTextKey(key) ? 'textarea' : 'text'"
                :model-value="item[key]"
                :class="isLongTextKey(key) ? 'lg:col-span-2' : ''"
                @update:model-value="updateItem(index, key, $event)"
              />
            </template>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
