const defaultApiUrl = 'https://tracknode.ru/api'
const defaultBackendUrl = 'https://tracknode.ru'
const defaultSiteSlug = 'a-meditation'

function normalizeUrl(value, fallback) {
  return String(value || fallback).trim().replace(/\/+$/, '')
}

export const apiUrl = normalizeUrl(import.meta.env.VITE_API_URL, defaultApiUrl)
export const backendUrl = normalizeUrl(import.meta.env.VITE_BACKEND_URL, defaultBackendUrl)
export const siteSlug = String(import.meta.env.VITE_SITE_SLUG || defaultSiteSlug).trim()

export function buildApiUrl(path) {
  return `${apiUrl}/${String(path || '').replace(/^\/+/, '')}`
}

export function buildBackendUrl(path) {
  const value = String(path || '')
  if (!value || /^https?:\/\//i.test(value)) return value
  return `${backendUrl}/${value.replace(/^\/+/, '')}`
}
