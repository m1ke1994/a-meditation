import { computed, onMounted, ref } from 'vue'

const defaultApiBaseUrl = 'http://localhost:8000'
const defaultSiteSlug = 'a-meditation'

const normalizeBaseUrl = (value) => String(value || defaultApiBaseUrl).replace(/\/+$/, '')

const mediaKeyPattern = /(image|video|avatar|poster|photo|src|file)$/i

function absolutizeMediaValue(value, apiBaseUrl) {
  if (typeof value !== 'string') return value
  if (value.startsWith('http://') || value.startsWith('https://')) return value
  if (value.startsWith('/media/')) return `${apiBaseUrl}${value}`
  return value
}

function hydrateMediaUrls(payload, apiBaseUrl) {
  if (Array.isArray(payload)) {
    return payload.map((item) => hydrateMediaUrls(item, apiBaseUrl))
  }

  if (!payload || typeof payload !== 'object') {
    return payload
  }

  const next = {}
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'string' && mediaKeyPattern.test(key)) {
      next[key] = absolutizeMediaValue(value, apiBaseUrl)
      continue
    }
    next[key] = hydrateMediaUrls(value, apiBaseUrl)
  }
  return next
}

export function usePublicSiteContent() {
  const site = ref(null)
  const sections = ref([])
  const loading = ref(false)
  const error = ref('')

  const apiBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)
  const siteSlug = import.meta.env.VITE_SITE_SLUG || defaultSiteSlug

  const sectionsByKey = computed(() => {
    const map = {}
    for (const section of sections.value) {
      if (!section?.key) continue
      map[section.key] = section
    }
    return map
  })

  const getSection = (key) => sectionsByKey.value[key] || null

  const loadSiteContent = async () => {
    loading.value = true
    error.value = ''

    try {
      const response = await fetch(`${apiBaseUrl}/api/sites/${siteSlug}/`)
      if (!response.ok) {
        throw new Error(`Failed to load site content: ${response.status}`)
      }

      const payload = await response.json()
      site.value = payload?.site || null
      const rawSections = Array.isArray(payload?.sections) ? payload.sections : []
      sections.value = rawSections.map((section) => ({
        ...section,
        content: hydrateMediaUrls(section?.content || {}, apiBaseUrl),
      }))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load site content'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadSiteContent()
  })

  return {
    site,
    sections,
    sectionsByKey,
    loading,
    error,
    getSection,
    reload: loadSiteContent,
  }
}
