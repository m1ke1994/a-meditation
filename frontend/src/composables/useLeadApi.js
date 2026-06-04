const defaultApiBaseUrl = 'http://localhost:8000'
const defaultSiteSlug = 'a-meditation'

function normalizeBaseUrl(value) {
  return String(value || defaultApiBaseUrl).replace(/\/+$/, '')
}

export async function submitLead(payload) {
  const apiBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL)
  const requestPayload = {
    site_slug: import.meta.env.VITE_SITE_SLUG || defaultSiteSlug,
    source_url: window.location.href,
    ...payload,
  }

  const response = await fetch(`${apiBaseUrl}/api/leads/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok || data?.success === false) {
    throw new Error(data?.message || 'Не удалось отправить заявку')
  }

  return data
}
