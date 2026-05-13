import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { defaultContent, getContent, resetContent, saveContent } from '../../../../back/api/contentApi'

const clone = (value) => JSON.parse(JSON.stringify(value))

export const useSiteContentStore = defineStore('siteContent', () => {
  const content = ref(clone(defaultContent))
  const isLoaded = ref(false)
  const isSaving = ref(false)

  const sections = computed(() => content.value)

  const load = async () => {
    content.value = await getContent()
    isLoaded.value = true
  }

  const save = async () => {
    isSaving.value = true
    content.value = await saveContent(content.value)
    isSaving.value = false
  }

  const reset = async () => {
    content.value = await resetContent()
    isLoaded.value = true
  }

  const updateSection = (sectionKey, value) => {
    content.value[sectionKey] = clone(value)
  }

  const patchSection = (sectionKey, patch) => {
    content.value[sectionKey] = {
      ...content.value[sectionKey],
      ...patch,
    }
  }

  return {
    content,
    isLoaded,
    isSaving,
    sections,
    load,
    save,
    reset,
    updateSection,
    patchSection,
  }
})
