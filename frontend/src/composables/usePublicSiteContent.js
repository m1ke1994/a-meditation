import { computed, onMounted, ref } from 'vue'

import { buildApiUrl, buildBackendUrl, siteSlug } from '../config/api'

const mediaKeyPattern = /(image|video|avatar|poster|photo|src|file)$/i

function absolutizeMediaValue(value) {
  if (typeof value !== 'string') return value
  if (value.startsWith('/media/')) return buildBackendUrl(value)
  return value
}

function hydrateMediaUrls(payload) {
  if (Array.isArray(payload)) {
    return payload.map((item) => hydrateMediaUrls(item))
  }

  if (!payload || typeof payload !== 'object') {
    return payload
  }

  const next = {}
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === 'string' && mediaKeyPattern.test(key)) {
      next[key] = absolutizeMediaValue(value)
      continue
    }
    next[key] = hydrateMediaUrls(value)
  }
  return next
}

function setMetaDescription(value) {
  if (!value) return

  setNamedMeta('description', value)
}

function setNamedMeta(name, value) {
  if (!value) return

  let meta = document.head.querySelector(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', value)
}

function setPropertyMeta(property, value) {
  if (!value) return

  let meta = document.head.querySelector(`meta[property="${property}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('property', property)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', value)
}

function applySiteSeo(site) {
  const seo = site?.seo
  if (!seo || typeof seo !== 'object') return

  if (seo.title) {
    document.title = seo.title
    setPropertyMeta('og:title', seo.title)
    setNamedMeta('twitter:title', seo.title)
  }

  setMetaDescription(seo.description)
  setPropertyMeta('og:description', seo.description)
  setNamedMeta('twitter:description', seo.description)
  setPropertyMeta('og:type', 'website')
  setNamedMeta('twitter:card', 'summary')
}

export function usePublicSiteContent() {
  const site = ref(null)
  const sections = ref([])
  const loading = ref(false)
  const error = ref('')

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
      const response = await fetch(buildApiUrl(`sites/${encodeURIComponent(siteSlug)}/`), {
        cache: 'no-store',
      })
      if (!response.ok) {
        throw new Error(`Failed to load site content: ${response.status}`)
      }

      const payload = await response.json()
      site.value = payload?.site || null
      applySiteSeo(site.value)
      const rawSections = Array.isArray(payload?.sections) ? payload.sections : []
      sections.value = rawSections.map((section) => ({
        ...section,
        content: hydrateMediaUrls(section?.content || {}),
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
