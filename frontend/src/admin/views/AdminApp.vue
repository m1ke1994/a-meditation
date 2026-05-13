<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SectionEditor from '../components/SectionEditor.vue'
import {
  adminActionLabels,
  adminHints,
  adminSectionLabels,
  adminThemeLabels,
} from '../data/adminLabels'
import { useSiteContentStore } from '../stores/siteContent'
import { useAdminThemeStore } from '../stores/themeStore'

const ADMIN_PASSWORD = 'ADMIN_PASSWORD'

const contentStore = useSiteContentStore()
const themeStore = useAdminThemeStore()
const isAuthed = ref(sessionStorage.getItem('admin-auth') === 'true')
const password = ref('')
const loginError = ref('')
const activeSection = ref('hero')
const isSidebarOpen = ref(false)

const sections = [
  { key: 'dashboard', label: adminSectionLabels.dashboard },
  { key: 'hero', label: adminSectionLabels.hero },
  { key: 'simpleWords', label: adminSectionLabels.simpleWords },
  { key: 'aboutGuide', label: adminSectionLabels.aboutGuide },
  { key: 'meditations', label: adminSectionLabels.meditations },
  { key: 'gallery', label: adminSectionLabels.gallery },
  { key: 'reviews', label: adminSectionLabels.reviews },
  { key: 'prices', label: adminSectionLabels.prices },
  { key: 'contacts', label: adminSectionLabels.contacts },
  { key: 'header', label: adminSectionLabels.header },
  { key: 'footer', label: adminSectionLabels.footer },
  { key: 'settings', label: adminSectionLabels.settings },
]

const activeSectionLabel = computed(() => (
  sections.find((section) => section.key === activeSection.value)?.label || ''
))

const isContentSection = computed(() => (
  activeSection.value !== 'dashboard' && activeSection.value !== 'settings'
))

const isDarkTheme = computed(() => themeStore.currentTheme === 'dark')
const currentThemeLabel = computed(() => (
  isDarkTheme.value ? adminThemeLabels.light : adminThemeLabels.dark
))

const login = () => {
  if (password.value !== ADMIN_PASSWORD) {
    loginError.value = adminHints.wrongPassword
    return
  }

  sessionStorage.setItem('admin-auth', 'true')
  isAuthed.value = true
  loginError.value = ''
}

const logout = () => {
  sessionStorage.removeItem('admin-auth')
  isAuthed.value = false
  isSidebarOpen.value = false
}

const save = async () => {
  await contentStore.save()
}

const reset = async () => {
  await contentStore.reset()
}

const preview = () => {
  window.open('/', '_blank')
}

const selectSection = (sectionKey) => {
  activeSection.value = sectionKey
  isSidebarOpen.value = false
}

onMounted(() => {
  themeStore.initTheme()
  contentStore.load()
})

onBeforeUnmount(() => {
  themeStore.removeThemeClass()
})
</script>

<template>
  <main
    class="admin-theme-scope min-h-screen max-w-full overflow-x-hidden"
    :class="isDarkTheme ? 'dark bg-[#151412] text-[#F3EEE5]' : 'bg-[#F8F3EA] text-[#24231F]'"
  >
    <section
      v-if="!isAuthed"
      class="flex min-h-screen items-center justify-center px-4 py-8"
    >
      <form
        class="w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-5 shadow-[0_30px_90px_rgba(45,35,20,0.14)] dark:border-white/10 dark:bg-[#1E1C19] dark:shadow-none sm:p-6"
        @submit.prevent="login"
      >
        <p class="text-xs font-medium uppercase tracking-[0.28em] text-[#8B7449] dark:text-[#B89B67]">Admin</p>
        <h1 class="mt-3 break-words text-3xl font-semibold text-[#24231F] dark:text-[#F3EEE5]">
          {{ adminHints.loginTitle }}
        </h1>
        <p class="mt-3 text-sm leading-6 text-stone-600 dark:text-[#B7ADA0]">
          {{ adminHints.loginText }}
        </p>
        <input
          v-model="password"
          type="password"
          class="mt-6 block w-full min-w-0 max-w-full rounded-2xl border border-[#8B7449]/20 bg-[#F8F3EA] px-4 py-3 text-[#24231F] outline-none focus:border-[#8B7449] focus:bg-white dark:border-white/10 dark:bg-[#22201D] dark:text-[#F3EEE5] dark:placeholder:text-stone-500 dark:focus:border-[#B89B67]"
          :placeholder="adminHints.password"
        >
        <p
          v-if="loginError"
          class="mt-3 text-sm text-[#8B7449] dark:text-[#B89B67]"
        >
          {{ loginError }}
        </p>
        <button
          type="submit"
          class="mt-6 w-full rounded-full bg-[#24231F] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#8B7449] dark:bg-[#B89B67] dark:text-[#151412] dark:hover:bg-[#D6B781]"
        >
          {{ adminActionLabels.login }}
        </button>
      </form>
    </section>

    <section
      v-else
      class="min-h-screen max-w-full overflow-x-hidden lg:grid lg:grid-cols-[280px_1fr]"
    >
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm lg:hidden"
        @click="isSidebarOpen = false"
      />

      <aside
        class="fixed inset-y-0 left-0 z-50 w-[min(280px,calc(100vw-32px))] max-w-full -translate-x-full overflow-y-auto border-r border-black/10 bg-white/95 p-4 backdrop-blur-xl transition-transform duration-300 dark:border-white/10 dark:bg-[#181714] lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:w-[280px] lg:translate-x-0"
        :class="isSidebarOpen ? 'translate-x-0' : ''"
      >
        <div class="flex items-start justify-between gap-3 rounded-[2rem] bg-[#24231F] p-5 text-white dark:bg-[#2A2621]">
          <div class="min-w-0">
            <p class="text-xs uppercase tracking-[0.28em] text-white/60">CMS</p>
            <h1 class="mt-2 break-words text-2xl font-semibold">Лила Москва</h1>
          </div>
          <button
            type="button"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white lg:hidden"
            :aria-label="adminActionLabels.close"
            @click="isSidebarOpen = false"
          >
            ×
          </button>
        </div>

        <nav class="mt-5 grid gap-2">
          <button
            v-for="section in sections"
            :key="section.key"
            type="button"
            class="min-w-0 rounded-2xl px-4 py-3 text-left text-sm font-medium transition"
            :class="activeSection === section.key ? 'bg-[#24231F] text-white shadow-lg shadow-black/10 dark:bg-[#2A2621] dark:text-[#F3EEE5] dark:shadow-none' : 'text-stone-600 hover:bg-white hover:text-[#8B7449] dark:text-[#B7ADA0] dark:hover:bg-white/5 dark:hover:text-[#B89B67]'"
            @click="selectSection(section.key)"
          >
            <span class="block truncate">{{ section.label }}</span>
          </button>
        </nav>

        <button
          type="button"
          class="mt-5 w-full rounded-full border border-[#8B7449]/25 bg-white px-4 py-3 text-sm font-medium text-[#24231F] transition hover:text-[#8B7449] dark:border-white/10 dark:bg-[#22201D] dark:text-[#F3EEE5] dark:hover:text-[#B89B67]"
          @click="logout"
        >
          {{ adminActionLabels.logout }}
        </button>
      </aside>

      <div class="min-w-0 max-w-full overflow-hidden p-4 lg:col-start-2 lg:p-8">
        <header class="sticky top-0 z-30 -mx-4 mb-6 border-b border-black/10 bg-[#F8F3EA]/95 px-4 py-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#151412]/95 lg:-mx-8 lg:px-8">
          <div class="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div class="flex min-w-0 items-start gap-3">
              <button
                type="button"
                class="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#8B7449]/25 bg-white text-[#24231F] shadow-sm dark:border-white/10 dark:bg-[#22201D] dark:text-[#F3EEE5] lg:hidden"
                aria-label="Открыть меню"
                @click="isSidebarOpen = true"
              >
                ☰
              </button>
              <div class="min-w-0">
                <p class="text-xs uppercase tracking-[0.24em] text-[#8B7449] dark:text-[#B89B67]">Редактор</p>
                <h2 class="break-words text-2xl font-semibold text-[#24231F] dark:text-[#F3EEE5] sm:text-3xl">
                  {{ activeSectionLabel }}
                </h2>
              </div>
            </div>
            <div class="grid min-w-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
              <button
                type="button"
                class="min-w-0 rounded-full border border-[#8B7449]/25 bg-white px-4 py-3 text-sm font-medium text-[#24231F] transition hover:border-[#8B7449]/50 hover:text-[#8B7449] dark:border-white/10 dark:bg-[#22201D] dark:text-[#F3EEE5] dark:hover:border-[#B89B67]/50 dark:hover:text-[#B89B67] sm:px-5"
                @click="themeStore.toggleTheme"
              >
                {{ currentThemeLabel }}
              </button>
              <button
                type="button"
                class="min-w-0 rounded-full border border-[#8B7449]/25 bg-white px-4 py-3 text-sm font-medium text-[#24231F] transition hover:border-[#8B7449]/50 hover:text-[#8B7449] dark:border-white/10 dark:bg-[#22201D] dark:text-[#F3EEE5] dark:hover:border-[#B89B67]/50 dark:hover:text-[#B89B67] sm:px-5"
                @click="preview"
              >
                {{ adminActionLabels.preview }}
              </button>
              <button
                type="button"
                class="min-w-0 rounded-full border border-[#8B7449]/25 bg-white px-4 py-3 text-sm font-medium text-[#24231F] transition hover:border-[#8B7449]/50 hover:text-[#8B7449] dark:border-white/10 dark:bg-[#22201D] dark:text-[#F3EEE5] dark:hover:border-[#B89B67]/50 dark:hover:text-[#B89B67] sm:px-5"
                @click="reset"
              >
                {{ adminActionLabels.reset }}
              </button>
              <button
                type="button"
                class="min-w-0 rounded-full bg-[#24231F] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#8B7449] dark:bg-[#B89B67] dark:text-[#151412] dark:hover:bg-[#D6B781] sm:px-5"
                @click="save"
              >
                {{ contentStore.isSaving ? adminActionLabels.saving : adminActionLabels.save }}
              </button>
            </div>
          </div>
        </header>

        <section
          v-if="activeSection === 'dashboard'"
          class="max-w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_22px_70px_rgba(45,35,20,0.10)] dark:border-white/10 dark:bg-[#1E1C19] dark:shadow-none sm:p-6"
        >
          <h2 class="break-words text-2xl font-semibold text-[#24231F] dark:text-[#F3EEE5]">
            Управление сайтом
          </h2>
          <p class="mt-3 max-w-3xl break-words text-sm leading-7 text-stone-600 dark:text-[#B7ADA0]">
            {{ adminHints.dashboardText }}
          </p>
        </section>

        <section
          v-else-if="activeSection === 'settings'"
          class="max-w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_22px_70px_rgba(45,35,20,0.10)] dark:border-white/10 dark:bg-[#1E1C19] dark:shadow-none sm:p-6"
        >
          <h2 class="break-words text-2xl font-semibold text-[#24231F] dark:text-[#F3EEE5]">
            Настройки
          </h2>
          <p class="mt-3 text-sm leading-7 text-stone-600 dark:text-[#B7ADA0]">
            Текущая тема админки сохраняется после перезагрузки страницы.
          </p>
          <button
            type="button"
            class="mt-5 rounded-full bg-[#24231F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8B7449] dark:bg-[#B89B67] dark:text-[#151412] dark:hover:bg-[#D6B781]"
            @click="themeStore.toggleTheme"
          >
            Переключить тему
          </button>
        </section>

        <SectionEditor
          v-else-if="isContentSection"
          :title="activeSectionLabel"
          :model-value="contentStore.content[activeSection]"
          @update:model-value="contentStore.updateSection(activeSection, $event)"
        />
      </div>
    </section>
  </main>
</template>
