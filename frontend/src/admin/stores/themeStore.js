import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'admin-theme'
const THEMES = ['light', 'dark']

const applyThemeClass = (theme) => {
  if (typeof document === 'undefined') return

  document.documentElement.classList.toggle('dark', theme === 'dark')
}

const removeThemeClass = () => {
  if (typeof document === 'undefined') return

  document.documentElement.classList.remove('dark')
}

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = localStorage.getItem(STORAGE_KEY)
  if (THEMES.includes(savedTheme)) return savedTheme

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useAdminThemeStore = defineStore('adminTheme', () => {
  const currentTheme = ref('light')

  const setTheme = (theme) => {
    if (!THEMES.includes(theme)) return

    currentTheme.value = theme
    localStorage.setItem(STORAGE_KEY, theme)
    applyThemeClass(theme)
  }

  const toggleTheme = () => {
    setTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
  }

  const initTheme = () => {
    setTheme(getInitialTheme())
  }

  return {
    currentTheme,
    setTheme,
    toggleTheme,
    initTheme,
    removeThemeClass,
  }
})
